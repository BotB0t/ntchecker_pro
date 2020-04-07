from typing import List
from django.contrib.auth.models import User
from django.forms.models import model_to_dict


def assemble_user_list(data: list) -> List[User]:
    return [assemble_user(user) for user in data]


def assemble_user(user: User) -> User:
    user = model_to_dict(user)
    return user
