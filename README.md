demoLink: https://ganeshdarga.github.io/spotifyfrontend/

admin details.
username: admin.
password: admin123.

->Also you can signup with your own details and you can login as a userlogin.

1.Here’s a detailed explanation of how to set up the CRM project on your local system, based on your instructions:
->Download the ZIP files for crmfrontend and crmbackend from your repository.
->Once the ZIP files are downloaded, extract them. You should now have two separate directories:
crmfrontend (contains the frontend code)
crmbackend (contains the backend code)

2. Install Required Dependencies and Libraries
You'll need to install several dependencies to make the project work, including Node.js libraries for the frontend and Django-related packages for the backend.

Frontend Dependencies (React-based)
Navigate to the crmfrontend directory:
cd path/to/crmfrontend
Install the dependencies using npm (or yarn). These dependencies include things like:
Node.js: The runtime for JavaScript applications.
React Routers: For handling routing in React.
Axios: For making HTTP requests to the backend API.
React Icons: For using icons in the UI.
React Graphs: For generating charts or graphs.
Install them by running:
npm install
You can see all the required dependencies listed in the package.json file. The import statements in the code will also show which libraries are needed.

3.Backend Dependencies (Django-based)
Navigate to the crmbackend directory:
cd path/to/crmbackend
Install Python and Django-related dependencies. You’ll need:
Django: The web framework used to build the backend.
Django REST Framework (DRF): To create the RESTful API for the backend.
Install all necessary libraries listed in the requirements.txt file:
pip install -r requirements.txt
This will install Django, Django REST Framework, and any other required packages for the backend.


4. Configure Backend Settings (Django)
Once the backend dependencies are installed, you’ll need to configure the crmbackend project to connect to your local database.
Navigate to settings.py in the crmbackend directory:
cd path/to/crmbackend/crmproject
nano settings.py  # or use any code editor like VSCode
Configure the Database Settings:
In the settings.py file, find the DATABASES section and modify it to reflect your local database setup.
For example, if you’re using PostgreSQL, you would configure it like this:
python
Copy code
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
If you're using MySQL or SQLite, update the settings accordingly.
Apply Database Migrations:
Once the database is configured, you need to apply the migrations to set up the database schema.
Run the following command to perform migrations:
python manage.py migrate
This will create all necessary tables in the database.

5. Start the Backend Server (Django)
Start the Django backend server by running the following command in the crmbackend directory:
python manage.py runserver
This will start your backend server, and you can access the API at:
http://localhost:8000

6. Start the Frontend Development Server (React)
Navigate to the crmfrontend directory:
cd path/to/crmfrontend
Run the React development server using npm:
npm start
The React frontend will start running, and you can view the project in your browser at:
http://localhost:3000


