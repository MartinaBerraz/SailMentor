# Generated by Django 4.2.6 on 2023-11-06 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_yacht_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='name',
            field=models.CharField(default='Sunsail', max_length=30),
            preserve_default=False,
        ),
    ]
