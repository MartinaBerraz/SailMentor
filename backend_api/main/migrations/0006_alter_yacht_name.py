# Generated by Django 4.2.6 on 2023-10-09 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_yachttype_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yacht',
            name='name',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
