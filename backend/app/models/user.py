from ..extensions import db

class User(db.Model):
    __tablename__ = 'Users'

    User_id = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String(50), nullable=False)
    Dietary_restrictions = db.Column(db.String(255), nullable=True)
    Budget_goal = db.Column(db.Numeric(6,2), nullable=True)
    Nutrition_goals = db.Column(db.Integer, nullable=True)

    def to_dict(self):
        return {
            'user_id': self.User_id,
            'username': self.Username,
            'dietary_restrictions': self.Dietary_restrictions,
            'budget_goal': float(self.Budget_goal) if self.Budget_goal else None,
            'nutrition_goals': self.Nutrition_goals
        }