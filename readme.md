## 🚀 **Quick Start: Signup-Login Boilerplate**
You may not need to implement a signup-login page from scratch! Just use this and **get started with other activities** of your app.

### 🛠 **Setup Instructions**
#### **1️⃣ Configure Environment Variables**
Navigate to the `/backend` folder and to **`.env`** file and enter following values:

- **MongoDB Connection URL** (`MONGODB_URL`)  
- **Gmail Account** (which acts as from, to send forgot passwords to users)  
- **Gmail App Password** (⚠️ Not your actual Gmail password!)

📌 **How to Get a Gmail App Password?**  
Watch this tutorial: [🔗 Click Here](https://www.youtube.com/watch?v=MkLX85XU5rU)

```env
MONGODB_URL=your_mongodb_url
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASSWORD=your_generated_app_password
```

---

#### **2️⃣ Install & Run the Backend**
```sh
cd backend
npm install
nodemon server.js
```
This will start the backend server.

---

#### **3️⃣ Install & Run the Frontend**
```sh
cd frontend/react
npm install
npm run dev
```
This will start the frontend development server.

---

### 🎯 **You're Ready to Go!**
Now, your signup-login system is up and running. **Start building your app! 🚀**  

---

# Flow chart

/user ->                                                                                        true
        if browser has authorization header -> verify the token through -> authMiddleWare ------------------>
        |                                                                                                   |
        |else                                                                                               |
        >SignUp/LogIn -> (check email and password are according to standard) -->                           |
                        ----> authValidation Midleware ---->                           True                 |
                        True ---> (check valid users) -> authController ----------------------------------->|
                                                                                                            |
                                                                                                            |
                                                                                                            |
show /user page                                 <------------------------------------------------------------

# how AuthMiddleware works:-
    1) get token from Authorization of header of request
    2) if JWT token can be decoded by our JWT secret key, through jwt verify
            then it is a valid token and you can to next middleware or function written in /user routes
    
# how AuthVaildation works:-
    1)it uses joi library  to validate the user input
    2)define joi schema for signup/lgoin
    3)validate the user input with this schema 
        if valid input and you can to next middleware or function written in /user routes

# how SignUp Works:-
    1)after AuthValidion next():-
    2)get name, email, password from request
    3)if user already exists then just call LogIn Function
    4)encrypt the password through bcrypt library
    5)create new user with name, email, hashedPassword
    6)save the new user
    7)jwt Assign Token to new user

# how LogIn Works:-
    1)after AuthValidion next():-
    2)get email, password from request
    3)if user does not exists return error
    4)check password given is correct with hashed password in database by bycrypt compare
    5)jwt Assign Token to new user

# how jwt Assign token works
    1)we create a token througjh jwt sign
    which takes 3 paremeters jwt.sign({userID: userObj}, secretKey, expiresin:'24h')

# how forgot password works
    1)after AuthValidion next() : (optional)
    2)get email from request
    3)if user does not exists return error
    4)generate resetToken from jwt.sign with user id and secret key
    5)create a nodemailer transporter which is Authenticated by Gmail SMTP server.
         this Enables to connect to Gmail SMTP server and Send emails using your Gmail account.
    6)generate mailoption to userEmail and message with reset link(directs frontend).
    7) Send email and return a success response if successful.

# how reset password works
    1)after AuthValidion next() : (optional)
    2)get resetToken from request
    3)if resetToken is valid then get user id from token
    4)get password from request
    5)hash the password
    6)update user's password in database

# Screenshot of this Project:- 

## SignUp Page

![Screenshot 2025-03-06 001057](https://github.com/user-attachments/assets/d8fe8fbe-bf51-4cd1-a8a8-868adfc86929)

## Login Page (user not found)

![Screenshot 2025-03-06 001450](https://github.com/user-attachments/assets/3792a357-6794-4469-8bca-6c31581a0198)

## Home page

![Screenshot 2025-03-06 001112](https://github.com/user-attachments/assets/0f00b4a3-2393-43af-9a82-487e9d8df8f5)

## Forgot password Page

![Screenshot 2025-03-06 001822](https://github.com/user-attachments/assets/4274e6e4-21fe-4d1d-902c-6a63de81de2b)

## Gmail Reset link sent from GMAIL_USER

![Screenshot 2025-03-06 002000](https://github.com/user-attachments/assets/f956a538-b9a7-4134-8ce3-158bc8f6d5b2)

## Reset Password Page
![Screenshot 2025-03-06 002021](https://github.com/user-attachments/assets/58762cad-a36b-4b1f-bb8f-c79edaad4dde)

