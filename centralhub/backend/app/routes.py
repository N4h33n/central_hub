from flask import render_template
from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
import mysql.connector

routes = Blueprint('routes', __name__)
host_url = 'http://localhost:3000'

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password="sQlprequelwoohoo7676",
        database='centralhub'
    )
    
def create_routes(app):

    @app.route('/api/adminlogin', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def admin_login():
        data = request.get_json()
        try:

            connection = get_db_connection()


            cursor = connection.cursor()


            query = "SELECT * from admin as A, faculty as F Where F.f_ucid = A.a_ucid and F.email = (%s) and A.passhash = (%s)"
            values = (data.get('email'), data.get('password'))
            cursor.execute(query, values)

            result = cursor.fetchone()

            if result:
                return jsonify({'success': True})
        
            else:
                return jsonify({'success': False})
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
        
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
            print(f"Error{e}")
        
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

            query = "insert into STUDENT values (%s, %s, %s, %s, %s, %s, %s)"
            
            values = (data.get('ucid'), data.get('email'), data.get('telephone'), data.get('name'), data.get('address'), data.get('password'), data.get('a_ucid'))
            cursor.execute(query, values)
            
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
    
    @app.route('/api/studentinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_info():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT C.courseno, C.coursename, C.semester from COURSE as C, STUDENT_ENROLLEDIN_COURSE as SC where SC.s_ucid = (%s) and SC.courseno = C.courseno"
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    #POST?   
    @app.route('/api/studentlogin', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_login():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT * from STUDENT as S where S.email = (%s) and S.passhash = (%s)"
            values = (data.get("email"), data.get("password"))
            cursor.execute(query, values)

            
            result = cursor.fetchone()

            s_ucid = result[0]
            
            if result:
                return jsonify({'success': True, 'ucid': s_ucid})
        
            else:
                return jsonify({'success': False})
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
              
    @app.route('/api/dashboardassignments', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def dashboard_assignments():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT SA.courseno, SA.assignmentno, A.deadline, A.weight from STUDENT_DOES_ASSIGNMENT as SA, ASSIGNMENT as A where SA.s_ucid = (%s) and SA.courseno = A.courseno and SA.assignmentno = A.assignmentno"
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/dashboardexams', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def dashboard_exams():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT SE.courseno, SE.examno, E.time, E.location, E.weight from STUDENT_TAKES_EXAM as SE, EXAM as E where SE.s_ucid = (%s) and SE.courseno = E.courseno and SE.examno = E.examno"
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/dashboardname', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def dashboard_name():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT S.name from STUDENT as S where S.s_ucid = (%s)"
            print(data.get("ucid"))
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()

    @app.route('/api/studentinfodefault', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_info_default():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT S.name, S.email, S.s_ucid, s.address, s.passhash from STUDENT as S where S.s_ucid = (%s)"
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    # @app.route('/api/enrolledcourses', methods = ['POST'])
    # @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    # def enrolled_courses():
    #     data = request.get_json()
        
    #     try:
    #         connection = get_db_connection()

    #         cursor = connection.cursor()

    #         query = "select sc.courseno, c.coursename, (sum(sa.grade * a.weight) + sum(se.grade * e.weight)) from COURSE as c, STUDENT_ENROLLEDIN_COURSE as sc, STUDENT_DOES_ASSIGNMENT as sa. STUDENT_TAKES_EXAM as se, ASSIGNMENT as a, EXAM as e where sc"
    #         values = (data.get("telephonenumber"), data.get("address"), data.get("password"), data.get("ucid"))
    #         cursor.execute(query, values)

    #         connection.commit()
                
    #         return "True"
            
    #     except mysql.connector.Error as e:
    #             print(f"Error: {e}")

    #             return "False"
    #     finally:
    #         cursor.close()
    #         connection.close()
    
    @app.route('/api/explorecourses', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def explore_courses():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.semester, l.lectureno, f1.name, t.tutorialno, f2.name, cf.field from COURSE as c, LECTURE as l, TUTORIAL as t, FACULTY as f1, FACULTY as f2 where l.courseno = c.courseno and t.courseno = c.courseno and l.i_ucid = f1.f_ucid and t.t_ucid = f2.f_ucid and cf.courseno = c.courseno"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/scourses', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def scourses():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.semester, l.lectureno, f1.name, t.tutorialno, f2.name, cf.field from COURSE as c, LECTURE as l, TUTORIAL as t, FACULTY as f1, FACULTY as f2 where l.courseno = c.courseno and t.courseno = c.courseno and l.i_ucid = f1.f_ucid and t.t_ucid = f2.f_ucid and cf.courseno = c.courseno"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
        
        

