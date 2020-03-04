from .local import *

DATABASES['default']['PORT'] = '15432'
DATABASES['default']['PASSWORD'] = POSTGRES_PASSWORD

APP_TRANSLATE_MOCK = True
