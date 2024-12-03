from flask import Blueprint, jsonify, request
from ..extensions import db
import sqlalchemy
from ..models.recipe import Recipe

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/settings/<int:user_id>', methods=['GET'])
def get_user_settings(user_id):
    try:
        query = sqlalchemy.text("""
            SELECT Username, Dietary_restrictions, Budget_goal, Nutrition_goals 
            FROM Users 
            WHERE User_id = :user_id
        """)
        result = db.session.execute(query, {'user_id': user_id}).fetchone()
        
        if result is None:
            return jsonify({'error': 'User not found'}), 404
            
        settings = {
            'username': result[0],
            'dietary_restrictions': result[1],
            'budget_goal': result[2],
            'nutrition_goals': result[3]
        }
        
        return jsonify(settings)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/settings/<int:user_id>', methods=['PUT'])
def update_user_settings(user_id):
    try:
        data = request.get_json()
        
        query = sqlalchemy.text("""
            UPDATE Users 
            SET Dietary_restrictions = :dietary,
                Budget_goal = :budget,
                Nutrition_goals = :nutrition
            WHERE User_id = :user_id
        """)
        
        db.session.execute(query, {
            'dietary': data.get('dietary_restrictions'),
            'budget': data.get('budget_goal'),
            'nutrition': data.get('nutrition_goals'),
            'user_id': user_id
        })
        
        db.session.commit()
        return jsonify({'message': 'Settings updated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500