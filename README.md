# validator-notification
Website to validate the reception of notifications


### Setup

1. Clone the repository
1. Install pipenv: `pip3 install pipenv`
    
1. Run `pipenv install --dev` from the root folder of the repository
1. Set the environment variable `DJANGO_READ_DOT_ENV_FILE=true`
1. Check that you have 2 files in `.envs/local` (if you want to start the application with another environment, 
set the environment variable accordingly `NT_ENV=itg|pre|pro`):
  
    1. `.vars`: Configuration variables. For convenience, there is an `.vars` file inside each subfolder under `.envs`, 
    each corresponding to one of the GCP environments. The vars file should contain all variables declared
    in `config/settings/_vars.py`
    1. `.secrets`: Ask for it to get the latest version. The secrets file should contain all variables declared
    in `config/settings/_secrets.py`


### Local deployment

1. Start PostgreSQL. You can run a script to start a postgres Docker container (with no persistent volume):  
`start_db.sh` located at `devops/db/postgres` (Don't forget to activate your virtual env!): 
`./devops/db/postgres/start_db.sh` ( ⚠️: an error on the first time could be normal, just relaunch the script a second time ).

1. Run the django server:
    - The application is configured through environment variables, which for convenience should be specified in .env files. 
    For django to load them at start, set the environment variable `export DJANGO_READ_DOT_ENV_FILE=true`
    - Set the environment variable `export DJANGO_SETTINGS_MODULE=config.settings.local`
    - `python manage.py runserver 0.0.0.0:8000`