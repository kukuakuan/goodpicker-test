from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from pkg_resources import require


class UserManager(BaseUserManager):

    def create_user(self, username, email, password, name, userProvinceID, **kwargs):
        if password is None:
            raise TypeError('Users must have a password.')
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')
        if name is None:
            raise TypeError('Users must have an name.')
        if userProvinceID is None:
            raise TypeError('Users must have an userProvinceID.')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            name=name,
            userProvinceID=Province.objects.get(pk=userProvinceID)
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, name, userProvinceID):
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')
        if name is None:
            raise TypeError('Superusers must have an name.')
        if userProvinceID is None:
            raise TypeError('Superusers must have an userProvinceID.')

        user = self.create_user(username, email, password, name, userProvinceID)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class Province(models.Model):
    userProvinceID = models.AutoField(primary_key=True)
    userProvinceName= models.CharField(max_length=64)

    def __str__(self):
        return f"{self.userProvinceName}"

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=64)
    username = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    userImage = models.ImageField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    userProvinceID = models.ForeignKey(Province, on_delete=models.CASCADE)
    userPhoneNumber = models.CharField(max_length=10, null = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password', 'name', 'userProvinceID']

    objects = UserManager()
    def __str__(self):
        return f"{self.username} ({self.email})"

class Category(models.Model):
    goodsCategoryID = models.AutoField(primary_key=True)
    goodsCategoryName= models.CharField(max_length=64)

    def __str__(self):
        return f"{self.goodsCategoryName}"

class Goods(models.Model):
    goodsID = models.AutoField(primary_key=True)
    goodsCreateId = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsName = models.CharField(max_length=64)
    goodsCategoryID = models.ForeignKey(Category, on_delete=models.CASCADE)
    goodsDescription = models.CharField(max_length=600, null=True, blank=True)
    goodsPrice = models.IntegerField()
    goodsStatus = models.BooleanField(default=False)
    goodsLocation = models.CharField(max_length=64)
    goodsUpdatedTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.goodsName} ({self.goodsPrice})"

class GoodsImage(models.Model):
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True)
    isMain = models.BooleanField()

# class Rating(models.Model):
#     userID = models.ForeignKey(User, on_delete=models.CASCADE)
#     ratingScore = models.IntegerField()

#     def __str__(self):
#         return f"{self.ratingScore}"

class Comment(models.Model):
    class CommentKey:
        uniqueComment = (('userID', 'goodsID'),)

    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goodsID = models.ForeignKey(Goods, on_delete=models.CASCADE)
    commentContent = models.CharField(max_length=200)
    commentTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.commentContent} ({self.commentTime})"

class Chat(models.Model):
    participants = models.ManyToManyField(
        User, related_name='chats', blank=True)

    def __str__(self):
        return "{}".format(self.pk)

class Contact(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    partner = models.ForeignKey(User, related_name='contacts', on_delete=models.CASCADE)
    chatId = models.ForeignKey(Chat, on_delete=models.CASCADE)

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


class Budget(models.Model):
    budgetId = models.CharField(primary_key=True,max_length=50)
    version = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    createUser = models.CharField(max_length=50)
    createDate = models.CharField(max_length=50)
    editUser = models.CharField(max_length=50)
    editDate = models.CharField(max_length=50)
    project = models.CharField(max_length=50)
    voucherNumber = models.CharField(max_length=50)
    budgetProjectName = models.CharField(max_length=50)
    note = models.CharField(max_length=50, blank=True)
    totalBudgetBeforeTax = models.CharField(max_length=50)
    totalBudgetAfterTax= models.CharField(max_length=50)
    totalValueTax = models.CharField(max_length=50)
    currencyType = models.CharField(max_length=50)


class AnotherBudget(models.Model):
    budgetId = models.IntegerField(primary_key=True)
    version = models.IntegerField()
    company = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    createUser = models.CharField(max_length=50)
    createDate = models.DateField(auto_now=True)
    editUser = models.CharField(max_length=50)
    editDate = models.DateField(auto_now=True)
    project = models.CharField(max_length=50)
    voucherNumber = models.CharField(max_length=50)
    budgetProjectName = models.CharField(max_length=50)
    note = models.CharField(max_length=50)
    totalBudgetBeforeTax = models.FloatField()
    totalBudgetAfterTax= models.FloatField()
    totalValueTax = models.FloatField()
    currencyType = models.CharField(max_length=50)