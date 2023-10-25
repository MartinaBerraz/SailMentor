from django.db import models as django_models

from django.apps import apps

def get_model_fields_info(model_name):
    try:
        model = apps.get_model(app_label='main', model_name=model_name)
        fields_info = {}
        for field in model._meta.fields:
            fields_info[field.name] = field.get_internal_type()
        return fields_info
    except LookupError:
        return None
