from flask import Flask,render_template,url_for,request,json,jsonify
from databse import insert_into_requested_users

app=Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/registration_request", methods=["POST"])
def reg_req():
    data = request.form.to_dict() 
   
    result = insert_into_requested_users(data)

    if result == "Registration successful!":
        return render_template("thanku.html")  
    else:
        return render_template("reg_error.html") 

if __name__=="__main__":
    app.run(debug=True)
   