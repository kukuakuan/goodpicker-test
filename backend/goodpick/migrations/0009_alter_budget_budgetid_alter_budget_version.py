# Generated by Django 4.0.4 on 2022-06-06 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goodpick', '0008_alter_budget_createdate_alter_budget_editdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='budgetId',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='budget',
            name='version',
            field=models.CharField(max_length=50),
        ),
    ]
