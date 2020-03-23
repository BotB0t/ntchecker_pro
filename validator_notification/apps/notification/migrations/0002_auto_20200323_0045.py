# Generated by Django 3.0.4 on 2020-03-22 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='individualnotification',
            name='option_selected',
            field=models.CharField(choices=[('SI', 'OK'), ('NO', 'KO')], default='', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='generalnotification',
            name='thumbnail',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='generalnotification',
            name='url',
            field=models.CharField(max_length=200),
        ),
    ]
