from ..extensions import db
from datetime import datetime

class MealPlan(db.Model):
    __tablename__ = 'Meal_Plan'
    
    Meal_plan_id = db.Column(db.Integer, primary_key=True)
    User_id = db.Column(db.Integer, db.ForeignKey('Users.User_id'), nullable=False)
    Date = db.Column(db.Date, nullable=False)
    Time = db.Column(db.String(50))
    Recipe_id = db.Column(db.Integer, db.ForeignKey('Recipe.Recipe_id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.Meal_plan_id,
            'user_id': self.User_id,
            'date': self.Date.isoformat(),
            'time': self.Time,
            'recipe_id': self.Recipe_id
        }