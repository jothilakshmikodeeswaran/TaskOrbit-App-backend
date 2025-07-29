🧪 1. Use Postman or Thunder Client (Visual API Tester)
Create Collections:
Organize each route as a separate folder:

🔑 User Routes: POST /api/users/register, POST /api/users/login

📁 Project Routes: GET, POST, PUT, DELETE /api/projects

📌 Task Routes: GET, POST, PUT, DELETE /api/tasks

👥 Employee Routes: GET, POST, PUT, DELETE /api/employees

For Authenticated Routes:
In login response, copy the JWT token

In Postman, go to the request → Authorization tab → choose Bearer Token → paste your token

Or use Pre-request Script to automate token injection if you’re feeling fancy

📋 2. Use Test Payloads

Example: Create Project

POST /api/projects
{
  "name": "New CRM System",
  "description": "Internal tool for customer management"
}
Example: Create Employee

POST /api/employees
{
  "name": "Lakshmi",
  "email": "lakshmi@example.com",
  "role": "QAEngineer",
  "sex": "Female",
  "bio": "Testing lead",
  "joinedAt": "2023-05-01"
}