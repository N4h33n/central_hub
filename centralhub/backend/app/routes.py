from flask import render_template
from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
import mysql.connector

routes = Blueprint('routes', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='*PASSworld*123',
        database='centralhub'
    )
    
# testing using dummy template test.html will change later
def create_routes(app):
    
    @app.route('/api/adminlogin', methods = ['POST'])
    @cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
    def admin_login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        try:
            # Establish a database connection
            connection = get_db_connection()

            # Create a cursor
            cursor = connection.cursor()

            # Execute a test query
            query = f"SELECT * from admin as A, faculty as F Where F.f_ucid = A.a_ucid and F.email = '{email}' and A.passhash = '{password}'"
            cursor.execute(query)
            # Fetch the result
            result = cursor.fetchone()

            if result:
                print("yayy")
                return jsonify({'success': True})
        
            else:
                print("nooo1")
                return jsonify({'success': False})

            
            # Close the cursor and connection
            cursor.close()
            connection.close()

        except mysql.connector.Error as e:
                print(f"Error: {err}")
        
        finally:
            cursor.close()
            connection.close()
    
