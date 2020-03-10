import re

regex = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"


def check_email(string: str):
    if(re.search(regex, string)):
        return True
    return False
