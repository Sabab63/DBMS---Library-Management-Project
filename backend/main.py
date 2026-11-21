from fastapi import FastAPI
import pymysql

app = FastAPI()

def get_db_connection():
    return pymysql.connect(
        host="mysql",
        user="root",
        password="root123",
        database="library_management",
        port=3306
    )

@app.get("/names")
def get_names():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Name")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data