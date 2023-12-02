from flask import render_template
from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
import mysql.connector

routes = Blueprint('routes', __name__)
host_url = 'http://localhost:3001'

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='sQlprequelwoohoo7676',
        database='centralhub'
    )
    
# testing using dummy template test.html will change later
def create_routes(app):
    
    @app.route('/api/adminlogin', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
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
                return jsonify({'success': True})
        
            else:
                return jsonify({'success': False})

            
            # Close the cursor and connection
            cursor.close()
            connection.close()

        except mysql.connector.Error as e:
                print(f"Error: oops")
        
        finally:
            cursor.close()
            connection.close()
    

    @app.route('/api/studentlist', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_list():

        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = f"SELECT s_ucid, name, email, phone, address from STUDENT"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        



        except mysql.connector.Error as e:
                print(f"Error: oops")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addstudent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def addStudent():
        
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "insert into STUDENT values (%s, %s, %s, %s, %s, %s)"
            
            values = (data.get('ucid'), data.get('email'), data.get('telephone'), data.get('name'), data.get('address'), data.get('password'))
            cursor.execute(query, values)
            
            connection.commit()
        
        except mysql.connector.Error as e:
            print("Error: oops")
        
        finally:
            cursor.close()
            connection.close()
        

