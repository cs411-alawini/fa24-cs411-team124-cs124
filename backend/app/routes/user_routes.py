from flask import Blueprint, request, jsonify
from ..extensions import db
import sqlalchemy


user_bp = Blueprint('users', __name__)

@user_bp.route('/users/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        print(data)
        username = data.get('username')
        
        if not username:
            return jsonify({'error': 'Username is required'}), 400
            
        query = sqlalchemy.text("""
            SELECT User_id, Username 
            FROM Users 
            WHERE Username = :username
        """)
        
        result = db.session.execute(query, {'username': username}).fetchone()
        
        if result:
            return jsonify({
                'user_id': result[0],
                'username': result[1]
            })
        else:
            return jsonify({'error': 'User not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        print(data)
        if not data.get('username'):
            return jsonify({'error': 'Username is required'}), 400
            
        check_query = sqlalchemy.text("""
            SELECT User_id FROM Users 
            WHERE Username = :username
        """)
        
        existing_user = db.session.execute(check_query, {
            'username': data['username']
        }).fetchone()

        max_id_query = sqlalchemy.text("SELECT MAX(User_id) FROM Users")
        max_id = db.session.execute(max_id_query).scalar()
        if max_id is None:
            max_id = 0  # Start from 1 if the table is empty
        new_user_id = max_id + 1

        print(existing_user)
        print(new_user_id)
        print(type(new_user_id))
        
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 409
        query = sqlalchemy.text("""
            INSERT INTO Users (User_id, Username, Dietary_restrictions, Budget_goal, Nutrition_goals)
            VALUES (:user_id, :username, :dietary, :budget, :nutrition)
        """)

        print("Q", query)
        
        result = db.session.execute(query, {
                'user_id': new_user_id,
                'username': str(data['username']),
                'dietary': str(data.get('dietary_restrictions', '')), 
                'budget': float(data.get('budget_goal', 0)),
                'nutrition': int(data.get('nutrition_goals', 0))  
            })
        print("R", result)
        
        db.session.commit()
        
        print("POST COMMIT ")
        return jsonify({
            'user_id': result.lastrowid,
            'message': 'User created successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'error': str(e)}), 500