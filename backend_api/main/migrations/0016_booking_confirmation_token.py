# Generated by Django 4.2.6 on 2023-11-15 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_sailor_first_name_sailor_last_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='confirmation_token',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]
