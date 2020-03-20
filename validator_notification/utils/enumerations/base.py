from enum import Enum


class BaseEnum(Enum):

    @classmethod
    def values(cls):
        return [i.value for i in cls]

    @classmethod
    def names(cls):
        return [i.name for i in cls]

    @classmethod
    def names_lower(cls):
        return [i.name.lower() for i in cls]

    @classmethod
    def tuples(cls):
        return [(i.value, i.name) for i in cls]

    @classmethod
    def items(cls):
        return tuple((i.name, i.value) for i in cls)
