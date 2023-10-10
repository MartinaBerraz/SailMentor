from django.db import models as django_models

def get_field_info(model_class):
    fields = model_class._meta.fields
    field_info = []

    for field in fields:
        if isinstance(field, django_models.ForeignKey):
            field_type = "ForeignKey"
        else:
            if isinstance(field, django_models.BigAutoField):
                field_type = "BigAutoField"
            else:
                field_type = field.get_internal_type()

        field_info.append({
            "name": field.name,
            "type": field_type,
        })

    return field_info