from flask import render_template
from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
import mysql.connector
from datetime import datetime, timedelta

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
            
            today = datetime.now()
            check_date = today + timedelta(weeks=2)

            query = "SELECT SA.courseno, SA.assignmentno, A.deadline, A.weight from STUDENT_DOES_ASSIGNMENT as SA, ASSIGNMENT as A where SA.s_ucid = (%s) and SA.courseno = A.courseno and SA.assignmentno = A.assignmentno and A.deadline <= (%s)"
            values = (data.get("ucid"), check_date)
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
            
            today = datetime.now()
            check_date = today + timedelta(weeks=2)

            query = "SELECT SE.courseno, SE.examno, E.time, E.location, E.weight from STUDENT_TAKES_EXAM as SE, EXAM as E where SE.s_ucid = (%s) and SE.courseno = E.courseno and SE.examno = E.examno and E.time <= (%s)"
            values = (data.get("ucid"), check_date)
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
            print(result)
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

            query = "SELECT S.name, S.email, S.s_ucid, s.phone, s.address, s.passhash from STUDENT as S where S.s_ucid = (%s)"
            values = (data.get("ucid"),)
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
    
    @app.route('/api/updateinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def update_info():
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "update student set phone = %s, address = %s, passhash = %s where s_ucid = %s"
            values = (data.get("telephone"), data.get("address"), data.get("passhash"), data.get("ucid"))
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            

            return "True"

        except mysql.connector.Error as e:
            print(f"Error{e}")
            return "False"
        
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

            query = "SELECT c.courseno, c.coursename, c.semester, l.lectureno, f1.name, t.tutorialno, f2.name, cf.field from COURSE as c, LECTURE as l, TUTORIAL as t, FACULTY as f1, FACULTY as f2, COURSE_FIELDS as cf where l.courseno = c.courseno and t.courseno = c.courseno and l.i_ucid = f1.f_ucid and t.t_ucid = f2.f_ucid and cf.courseno = c.courseno"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/filtercourses', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def scourses():
        
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.semester, l.lectureno, f1.name, t.tutorialno, f2.name, cf.field from COURSE as c, LECTURE as l, TUTORIAL as t, FACULTY as f1, FACULTY as f2, COURSE_FIELDS as cf where l.courseno = c.courseno and t.courseno = c.courseno and l.i_ucid = f1.f_ucid and t.t_ucid = f2.f_ucid and cf.courseno = c.courseno"
            
            if data.get("coursename"):
                query += "and c.coursename like %s"
            
            if data.get("coursenumber"):
                query += "and c.courseno like %s"
            
            if data.get("field"):
                query += "and cf.field like %s"
            
            if data.get("instructor"):
                query += "and f1.name like %s"
            
            if data.get("ta"):
                query += "and f2.name like %s"
                
            values = (data.get("coursename"), data.get("coursenumber"), data.get("field"), data.get("instructor"), data.get("ta"))
            
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledecas', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_ecas():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sc.clubname, sc.datejoined, c.description, c.location, c.time from CLUB as c, STUDENT_MEMBEROF_CLUB as sc where sc.s_ucid = %s and sc.clubname = c.clubname"
            values = (data.get("ucid"),)
            print("enrolledeca")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/discoverecas', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def discover_ecas():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.clubname, cf.field, c.location, c.time, c.description from CLUB as c, CLUB_FIELDS as cf where cf.clubname = c.clubname"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/filterecas', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def filterecas():
        
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.clubname, cf.field, c.location, c.time from CLUB as c, CLUB_FIELDS as cf where cf.clubname = c.clubname"
            
            conditions = []
            values = []

            if data.get("clubname") and data.get("clubname") != "":
                conditions.append("c.clubname LIKE %s")
                values.append("%" + str(data.get("clubname")) + "%",)

            if data.get("field") and data.get("field") != "":
                conditions.append("cf.field LIKE %s")
                values.append("%" + str(data.get("field")) + "%",)

            if data.get("time") and data.get("time") != "":
                conditions.append("c.time LIKE %s")
                values.append("%" + str(data.get("time")) + "%",)

            if data.get("location") and data.get("location") != "":
                conditions.append("c.location LIKE %s")
                values.append("%" + str(data.get("location")) + "%")
                
            print(conditions)
            print(values)
            
            if conditions:
                query += " AND " + " AND ".join(conditions)
                
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/updatepersonalinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def update_personal_info():
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "update student set name = %s, email = %s, s_ucid = %s, phone = %s, address = %s, passhash = %s where s_ucid = %s"
            values = (data.get("Name"), data.get("Email"), data.get("newucid"), data.get("PhoneNumber"), data.get("Address"), data.get("Password"), data.get("olducid"))
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            
            query2 = "select s.name, s.email, s.s_ucid, s.phone, s.address, s.passhash from STUDENT as s where s.s_ucid = %s"
            values2 = (data.get("newucid"),)
            
            cursor.execute(query2, values2)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
    
    
    @app.route('/api/loadpersonalinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def load_personal_info():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            query = "select s.name, s.email, s.phone, s.address, s.passhash from STUDENT as s where s.s_ucid = %s"
            values = (data.get("olducid"),)
            
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/assignmentcomponent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def assignment_component():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT SA.courseno, SA.assignmentno, SA.grade, A.deadline, A.weight from STUDENT_DOES_ASSIGNMENT as SA, ASSIGNMENT as A where SA.s_ucid = (%s) and SA.courseno = A.courseno and SA.assignmentno = A.assignmentno and SA.courseno = %s"
            values = (data.get("ucid"), data.get("courseno"))
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/examcomponent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def exam_component():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT SE.courseno, SE.examno, SE.grade, E.time, E.location, E.weight from STUDENT_TAKES_EXAM as SE, EXAM as E where SE.s_ucid = (%s) and SE.courseno = A.courseno and SE.examno = E.examno and SE.courseno = %s"
            values = (data.get("ucid"), data.get("courseno"))
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledresearch', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_research():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sr.researchid, r.title, rf.field, sr.datejoined, f.name from RESEARCH as r, STUDENT_PARTICIPATESIN_RESEARCH as sr, RESEARCH_FIELDS as rf, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, FACULTY as f where sr.s_ucid = %s and sr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = sr.researchid and rp.r_ucid = f.f_ucid"
            values = (data.get("ucid"),)
            print("research")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/pastresearch', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def past_research():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select cr.researchid, r.title, rf.field, r.description, f.name from RESEARCH as r, COMPLETED_RESEARCH as cr, RESEARCH_FIELDS as rf, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, FACULTY as f where cr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = cr.researchid and rp.r_ucid = f.f_ucid"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
        
    # @app.route('/api/enrolledcoursedetails', methods = ['POST'])
    # @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    # def enrolled_course_details():
    #     data = request.get_json()
        
    #     try:
    #         connection = get_db_connection()

    #         cursor = connection.cursor()

    #         query = "select sr.researchid, r.title, rf.field, sr.datejoined, f.name from RESEARCH as r, STUDENT_PARTICIPATESIN_RESEARCH as sr, RESEARCH_FIELDS as rf, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, FACULTY as f where sr.s_ucid = %s and sr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = sr.researchid and rp.r_ucid = f.f_ucid"
    #         values = (data.get("ucid"),)
    #         print(values)
    #         cursor.execute(query, values)

    #         columns = [column[0] for column in cursor.description]
    #         result = [dict(zip(columns, row)) for row in cursor.fetchall()]
    #         print(result)
    #         return jsonify(result)
            
    #     except mysql.connector.Error as e:
    #             print(f"Error: {e}")
    #             return jsonify({"error": "bruh"})

    #     finally:
    #         cursor.close()
    #         connection.close()
    
    @app.route('/api/enrolledlecturedetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_lecture_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sl.lectureno, l.time, l.location, f.name, f.f_ucid from STUDENT_ENROLLEDIN_LECTURE as sl, LECTURE as l, FACULTY as f where sl.s_ucid = %s and sl.courseno = %s and sl.courseno = l.courseno and sl.lectureno = l.lectureno and l.i_ucid = f.f_ucid"
            values = (data.get("ucid"), data.get("courseno"))
            print("lec")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledtutorialdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_tutorial_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select st.tutorialno, t.time, t.location, f.name, f.f_ucid from STUDENT_ENROLLEDIN_TUTORIAL as st, TUTORIAL as t, FACULTY as f where st.s_ucid = %s and st.courseno = %s and st.courseno = t.courseno and st.tutorialno = t.tutorialno and t.t_ucid = f.f_ucid"
            values = (data.get("ucid"), data.get("courseno"))
            print("tut")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledassignmentdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_assignment_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sa.assignmentno, a.deadline, a.weight, sa.grade from STUDENT_DOES_ASSIGNMENT as sa, ASSIGNMENT as a where sa.s_ucid = %s and sa.courseno = %s and sa.courseno = a.courseno"
            values = (data.get("ucid"), data.get("courseno"))
            print("assignment")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledexamdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_exam_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select se.examno, e.time, e.location, e.weight, se.grade from STUDENT_TAKES_EXAM as se, EXAM as e where se.s_ucid = %s and se.courseno = %s and se.courseno = e.courseno"
            values = (data.get("ucid"), data.get("courseno"))
            print("exam")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()


