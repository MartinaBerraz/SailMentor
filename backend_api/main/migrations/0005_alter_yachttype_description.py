# Generated by Django 4.2.6 on 2023-10-08 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rename_rating_review_experience_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yachttype',
            name='description',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
