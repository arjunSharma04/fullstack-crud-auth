from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app=Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cricket.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db=SQLAlchemy(app)
CORS(app)


# ********************* STUDENT MODEL ********************************
class Student(db.Model) : 
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(200), nullable=False)
    city=db.Column(db.String(100), nullable=False)

    def to_dict(self) : 
        return {
            "id":self.id,
            "name":self.name,
            "city":self.city
        }
    

    # ********************** USER MODEL ***********************************

class User(db.Model) : 
     id=db.Column(db.Integer, primary_key=True)
     user_name=db.Column(db.String(200), unique=True, nullable=False)
     password=db.Column(db.String(200), nullable=False)

     def to_dict(self) : 
        return{
            "id" : self.id,
            "user_name":self.user_name,
            "password" : self.password
        } 
     
with app.app_context() : 
    db.create_all()


#  ******************* STUDENT APIs ********************************

# create api for the add,read, delete students.
# Add Students.
@app.route("/add", methods=["POST"]) 
def addStudent() : 
    data=request.get_json()
    student=Student(id=data["id"], name=data["name"], city=data["city"])
    db.session.add(student)
    db.session.commit()
    return jsonify({"message" : "Student Added Successfully!"}
                   ),201

# get all Students. 
@app.route("/getAllData", methods=["GET"])
def getAllData() : 
    data=Student.query.all()
    return jsonify([datas.to_dict() for datas in data]
                   ),200

# get Specific Student.  
@app.route("/getStudent/<int:id>", methods=["GET"])
def getStudent(id) : 
    student=Student.query.get_or_404(id)
    return jsonify(student.to_dict()),200

# Update Student.
@app.route("/updateStudent", methods=["PUT"])
def updateStudent() : 
    data=request.get_json()
    student=Student.query.get_or_404(data["id"])
    student.name=data["name"]
    student.city=data["city"]
    db.session.commit()
    return jsonify(
        {"message" : "Student Updated Successfully"}
        ),200

# Delete Student.
@app.route("/del/<int:id>", methods=["DELETE"])
def delStudent(id) : 
    student=Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({
        "message" : "Student Deleted Successfully!"
    }),200



#  ******************** USER APIs *************************************



# Sign-Up api 

@app.route("/signup", methods=["POST"])
def signup() : 
    data= request.get_json()
    
    userName=data["user_name"]
    password=data["password"]

    # Validation.
    if not userName or not password :
        return jsonify({
            "message" : "Username and Password required"
        }),400
    
    # Check if user Allredy Exist.
    existing_user=User.query.filter_by(user_name=userName).first()
    if existing_user : 
        return jsonify({
            "message" : "User allready existed."
        })
    
    # Create new user.
    new_user= User(user_name=userName, password=password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message" : "User added successfully!"
    }),201


# Login api

@app.route("/login", methods=["POST"])
def login() : 
    data=request.get_json()
    userName=data["user_name"]
    password=data["password"]

    # 1 Validation.
    if not userName or not password : 
        return jsonify({
            "message" : "Username and Password required"
        }),400
    
    # 2. Find user  
    user= User.query.filter_by(user_name=userName).first()

    if not user : 
        return jsonify({
            "message" : "User not found"
        }),400
    
    # 3. check password
    if user.password==password: 
        return jsonify({
            "message" : "Login Successfully!",
            "user" : { 
                "id" : user.id,
                "user_name" : user.user_name
            }
        }),200
    else : 
        return jsonify({
            "message": "Invalid Password"
        }),401



app.run(debug=True)