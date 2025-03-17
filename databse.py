from sqlalchemy import create_engine,text
from sqlalchemy.exc import IntegrityError

connection_string="mysql+pymysql://root:dvnIBWAxUaasMrFzcvzLuUFmmBHrfuSS@tramway.proxy.rlwy.net:50529/Campuslink?charset=utf8mb4"
engine=create_engine(connection_string)

# def insert_into_requested_users(data):
#     with engine.connect() as conn:

#         with conn.begin():
            
#             try:
#                 query = text("INSERT INTO requested_users (full_name, email, mobile_number, admission_year) "
#                              "VALUES(:full_name, :email, :mobile_number, :admission_year)")
                
#                 conn.execute(query, {
#                     "full_name": data["fullname"],
#                     "email": data["email"],
#                     "mobile_number": data["mobile"],
#                     "admission_year": data["admission_year"]
#                 })

#                 conn.commit()

#             except IntegrityError:
#                 return "Error: This email is already registered. Please use a different email."

def insert_into_requested_users(data):
    with engine.connect() as conn:
        try:
            with conn.begin():  # Automatically commits if no error occurs
                query = text("INSERT INTO requested_users (full_name, email, mobile_number, admission_year) "
                             "VALUES(:full_name, :email, :mobile_number, :admission_year)")
                
                conn.execute(query, {
                    "full_name": data["fullname"],
                    "email": data["email"],
                    "mobile_number": data["mobile"],
                    "admission_year": data["admission_year"]
                })
                
            return "Registration successful!"

        except IntegrityError:
            return "Error: This email is already registered. Please use a different email."




