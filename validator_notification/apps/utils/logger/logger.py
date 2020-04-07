import logging


def get_instance_logger(class_instance):
    return logging.getLogger(f'{class_instance.__class__.__module__}.{class_instance.__class__.__name__}')


def get_logger(module: str, class_name=None):
    logger_name = f'{module}' if class_name is None else f'{module}.{class_name}'
    return logging.getLogger(logger_name)
