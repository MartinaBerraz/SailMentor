# Generated by Django 4.2.6 on 2023-10-12 23:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_yacht_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='experience',
            name='company',
        ),
        migrations.RemoveField(
            model_name='yacht',
            name='experience',
        ),
        migrations.AddField(
            model_name='experience',
            name='sailor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.sailor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='yacht',
            name='company',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='main.company'),
            preserve_default=False,
        ),
    ]
