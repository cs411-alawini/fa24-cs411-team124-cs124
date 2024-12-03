from flask import Blueprint, jsonify
from ..extensions import db
import sqlalchemy
from ..models.recipe import Recipe

meal_plan_bp = Blueprint('meal_plan', __name__)

@meal_plan_bp.route('/meal-plans/<int:plan_id>/nutrition', methods=['GET'])
def calculate_meal_plan_nutrition(plan_id):
    try:
        query = sqlalchemy.text("""
            SELECT r.Recipe_id, r.Title,
                   ri.Ingredient_Name, ri.Quantity, ri.Unit,
                   in.Carbohydrates, in.Protein, in.Total_fat, in.Kilocalories,
                   in.Sugar
            FROM Meal_Plan mp
            JOIN Recipe r ON mp.Recipe_id = r.Recipe_id
            JOIN Recipe_Ingredient ri ON r.Recipe_id = ri.Recipe_id
            JOIN Ingredient_Nutrition in ON ri.Ingredient_Name = in.Ingredient_Name
            WHERE mp.Meal_plan_id = :plan_id
        """)
        
        results = db.session.execute(query, {'plan_id': plan_id}).fetchall()
        
        if not results:
            return jsonify({'error': 'Meal plan not found'}), 404
            
        total_nutrition = {
            'calories': 0,
            'protein': 0,
            'carbohydrates': 0,
            'fat': 0,
            'sugar': 0
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
                    'sugar': 0
                }
            
            quantity_factor = row[3] / 100  # assuming quantity is in grams
            
            recipe_nutrition[recipe_id]['calories'] += (row[8] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['protein'] += (row[6] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['carbohydrates'] += (row[5] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['fat'] += (row[7] or 0) * quantity_factor
            recipe_nutrition[recipe_id]['sugar'] += (row[9] or 0) * quantity_factor
        
        for recipe in recipe_nutrition.values():
            total_nutrition['calories'] += recipe['calories']
            total_nutrition['protein'] += recipe['protein']
            total_nutrition['carbohydrates'] += recipe['carbohydrates']
            total_nutrition['fat'] += recipe['fat']
            total_nutrition['sugar'] += recipe['sugar']
        
        return jsonify({
            'total_nutrition': total_nutrition,
            'recipe_nutrition': recipe_nutrition
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500