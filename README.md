# validator_notification
Website to validate the reception of notifications. 

* [ntchecker-pro](https://rebrand.ly/ntchecker)

* [ntchecker-dev](https://rebrand.ly/ntchecker-dev)


## Local development

### Requirements

- [Python3](https://docs.python.org/3.7/)
- [pip3](https://pip.pypa.io/en/latest/installing/)
- Either [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/), 
or [PostgreSQL](https://www.postgresql.org/) 


### Setup

1. Clone the repository
1. Install pipenv: `pip3 install pipenv`
    
1. Run `pipenv install --dev` from the root folder of the repository
1. Set the environment variable `DJANGO_READ_DOT_ENV_FILE=true`
1. Check that you have 2 files in `.envs/local` (if you want to start the application with another environment, 
set the environment variable accordingly `NT_ENV=itg|dev`):
  
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


### PR's Rules

# BACK & FRONT
    • Todas se suben a la rama dev
    • El título de la PR tiene que tener un formato 'git commit'. Es decir, todo en minúsculas, comenzando con feat/ fix/ feature/ refactor... + (FEATURE) + : descripción corta. Tener en cuenta que tras cerrar la PR, es el mensaje de commit que queda en el histórico. 😉
    • En la descripción de la PR. Hay que incluir brevemente los motivos por los cuales se ha optado por esa implementación en concreto. Sobretodo en los casos más complejos (si es suficiente con el título de la PR, perfecto).
    • Las PR tienen que aprobarse por al menos 1 backs o fronts. 
    • Hay que añadir a revisores, incluirse a uno mismo como asignado y añadir las label que correspondan
    • Tenemos labels como WIP o Don't merge para facilitar las PR más complicadas, para que el resto del equipo las pueda revisar y aportar ideas.
    • La responsabilidad de las PR son del autor. Vamos a intentar que no se enquisten PR abiertas más de 2-3 días. Si hace falta, se persigue a la gente para que se revisen.
