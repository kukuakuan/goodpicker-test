# Generated by Django 4.0.4 on 2022-06-06 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goodpick', '0006_alter_budget_createdate_alter_budget_editdate'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnotherBudget',
            fields=[
                ('budgetId', models.IntegerField(primary_key=True, serialize=False)),
                ('version', models.IntegerField()),
                ('company', models.CharField(max_length=50)),
                ('status', models.CharField(max_length=50)),
                ('createUser', models.CharField(max_length=50)),
                ('createDate', models.DateField(auto_now=True)),
                ('editUser', models.CharField(max_length=50)),
                ('editDate', models.DateField(auto_now=True)),
                ('project', models.CharField(max_length=50)),
                ('voucherNumber', models.CharField(max_length=50)),
                ('budgetProjectName', models.CharField(max_length=50)),
                ('note', models.CharField(max_length=50)),
                ('totalBudgetBeforeTax', models.FloatField()),
                ('totalBudgetAfterTax', models.FloatField()),
                ('totalValueTax', models.FloatField()),
                ('currencyType', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='budget',
            name='totalBudgetAfterTax',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='budget',
            name='totalBudgetBeforeTax',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='budget',
            name='totalValueTax',
            field=models.IntegerField(),
        ),
    ]
