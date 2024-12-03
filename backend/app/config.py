from .services.db_connector import getconn

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://"
    SQLALCHEMY_ENGINE_OPTIONS = {
        "creator": getconn
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
