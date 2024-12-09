import traceback
from flask import Blueprint, request, jsonify
from ..extensions import db
import sqlalchemy
from ..models.recipe import Recipe

meal_plan_bp = Blueprint('meal_plan', __name__)



@meal_plan_bp.route('/meal-plans', methods=['GET'])
def get_meal_plan_for_user_id():
    try:
        user_id = request.args.get('user_id', type=int)
        query = sqlalchemy.text("""
            SELECT mp.Meal_plan_id, mp.Recipe_id, mp.Date, mp.Time, r.Title FROM Meal_Plan mp
            JOIN Recipe r ON mp.Recipe_id = r.Recipe_id
            WHERE mp.User_id = :user_id;
        """)
        results = db.session.execute(query, {'user_id': user_id}).fetchall()
        if not results:
            return jsonify({'error': 'No meal plan found for user'}), 404
        meal_plans = []
        for row in results:
            meal_plan = {'id': row.Meal_plan_id,
                         'recipe_id': row.Recipe_id,
                         'date': row.Date,
                         'time': row.Time,
                         'title': row.Title
                         }
            meal_plans.append(meal_plan)

        
       
        #print(meal_plans)
        return jsonify({'meal_plans': meal_plans})

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500



@meal_plan_bp.route('/meal-plans', methods=['POST'])
def create_meal_plan():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        recipe_id = data.get('recipe_id')
        date = data.get('date')
        timestr = data.get('time')
        time = ""
        if timestr == "Breakfast":
            time = 1
        elif timestr == "Lunch":
            time = 2
        else:
            time = 3
        
        # print(user_id)
        # print(recipe_id)
        # print(date)
        # print(time)
        check_query = sqlalchemy.text("""
            SELECT Meal_plan_id FROM Meal_Plan 
            WHERE User_id = :user_id
            AND Date = :date
            AND Time = :time
        """)
        existing_meal = db.session.execute(check_query, {
                                            'user_id': user_id, 
                                            'date': date,
                                            'time': time,
                                            }).fetchone()
        if existing_meal:
            query = sqlalchemy.text("""
            UPDATE Meal_Plan
            SET Recipe_id = :recipe_id
            WHERE User_id = :user_id AND Date = :date AND Time = :time;
            """)
            results = db.session.execute(query, {
                                             'user_id': user_id, 
                                             'date': date,
                                             'time': time,
                                             'recipe_id': recipe_id})
            print("updated")
            
        else:
            query = sqlalchemy.text("""
                INSERT INTO Meal_Plan (User_id, Date, Time, Recipe_id)
                VALUES (:user_id, :date, :time, :recipe_id);
            """)
            
            results = db.session.execute(query, {
                                                'user_id': user_id, 
                                                'date': date,
                                                'time': time,
                                                'recipe_id': recipe_id})
            
        db.session.commit()
        
        print("POST COMMIT ")
        return jsonify({
            'meal_plan_id': results.lastrowid,
            'message': 'Meal plan created successfully'
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@meal_plan_bp.route('/meal-plans/<int:plan_id>', methods=['DELETE'])
def delete_meal_plan(plan_id):
    try:
        query = sqlalchemy.text("""
                    DELETE FROM Meal_Plan
                    WHERE Meal_plan_id = :plan_id;
                """)
                
        results = db.session.execute(query, {
                                            'plan_id': plan_id, 
                                            })
            
        db.session.commit()
        print("POST COMMIT ")
        return jsonify({
            'id': plan_id,
            'message': 'User deleted successfully'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@meal_plan_bp.route('/meal-plans/<int:plan_id>/nutrition', methods=['GET'])
def calculate_meal_plan_nutrition(plan_id):
    try:
        query = sqlalchemy.text("""
            SELECT r.Recipe_id, r.Title,
                   ri.Ingredient_Name, ri.Quantity, ri.Unit,
                   in_n.Carbohydrates, in_n.Protein, in_n.Total_fat, in_n.Kilocalories,
                   in_n.Sugar, ip.Price_per_100_g
            FROM Meal_Plan mp
            JOIN Recipe r ON mp.Recipe_id = r.Recipe_id
            JOIN Recipe_Ingredient ri ON r.Recipe_id = ri.Recipe_id
            JOIN Ingredient_Nutrition in_n ON ri.Ingredient_Name = in_n.Ingredient_Name
            JOIN Ingredient_Price ip ON ri.Ingredient_Name = ip.Ingredient_Name
            WHERE mp.Meal_plan_id = :plan_id;
        """)
        results = db.session.execute(query, {'plan_id': plan_id}).fetchall()
        if not results:
            return jsonify({'error': 'Meal plan not found'}), 404

        total_nutrition = {
            'calories': 0,
            'protein': 0,
            'carbohydrates': 0,
            'fat': 0,
            'sugar': 0,
            'price': 0
        }

        recipe_nutrition = {}
        for row in results:
            recipe_id = row[0]
            if recipe_id not in recipe_nutrition:
                recipe_nutrition[recipe_id] = {
                    'title': row[1],
                    'calories': 0,
                    'protein': 0,
                    'carbohydrates': 0,
                    'fat': 0,
                    'sugar': 0,
                    'price': 0
                }

            quantity_factor = row[3] / 100  # assuming quantity is in grams

            recipe_nutrition[recipe_id]['calories'] += (row[8] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['protein'] += (row[6] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['carbohydrates'] += (row[5] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['fat'] += (row[7] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['sugar'] += (row[9] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['price'] += (row[10] or 0) * quantity_factor

        for recipe in recipe_nutrition.values():
            total_nutrition['calories'] += recipe['calories']
            total_nutrition['protein'] += recipe['protein']
            total_nutrition['carbohydrates'] += recipe['carbohydrates']
            total_nutrition['fat'] += recipe['fat']
            total_nutrition['sugar'] += recipe['sugar']
            total_nutrition['price'] += recipe['price']
        return jsonify({
            'total_nutrition': total_nutrition,
            'recipe_nutrition': recipe_nutrition
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500