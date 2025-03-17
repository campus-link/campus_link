from flask import Flask,render_template,url_for,request,json,jsonify
from databse import insert_into_requested_users

app=Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/registration_request", methods=["POST"])
def reg_req():
    data = request.form.to_dict()  # Convert form data to a dictionary
    # insert_into_requested_users(data)
    
    # return render_template("thanku.html")
    result = insert_into_requested_users(data)

    if result == "Registration successful!":
        return render_template("thanku.html")  # Redirect to thank-you page
    else:
        return render_template("reg_error.html")  # Show error if email already exists

if __name__=="__main__":
    app.run(debug=True)
   