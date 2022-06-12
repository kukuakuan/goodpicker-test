# Generated by Django 3.2.6 on 2021-08-11 18:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('name', models.CharField(max_length=64)),
                ('username', models.CharField(max_length=32, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('userImage', models.ImageField(blank=True, null=True, upload_to='')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('userPhoneNumber', models.CharField(max_length=10, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('goodsCategoryID', models.AutoField(primary_key=True, serialize=False)),
                ('goodsCategoryName', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('participants', models.ManyToManyField(blank=True, related_name='chats', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('goodsID', models.AutoField(primary_key=True, serialize=False)),
                ('goodsName', models.CharField(max_length=64)),
                ('goodsDescription', models.CharField(blank=True, max_length=600, null=True)),
                ('goodsPrice', models.IntegerField()),
                ('goodsStatus', models.BooleanField(default=False)),
                ('goodsLocation', models.CharField(max_length=64)),
                ('goodsUpdatedTime', models.DateTimeField(auto_now=True)),
                ('goodsCategoryID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goodpick.category')),
                ('goodsCreateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('userProvinceID', models.AutoField(primary_key=True, serialize=False)),
                ('userProvinceName', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='goodpick.chat')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GoodsImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('isMain', models.BooleanField()),
                ('goodsID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goodpick.goods')),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chatId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goodpick.chat')),
                ('partner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contacts', to=settings.AUTH_USER_MODEL)),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commentContent', models.CharField(max_length=200)),
                ('commentTime', models.DateTimeField(auto_now=True)),
                ('goodsID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goodpick.goods')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='userProvinceID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goodpick.province'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
