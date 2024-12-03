from ..extensions import db

class Recipe(db.Model):
    __tablename__ = 'Recipe'
    
    id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(255), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.Title
        }