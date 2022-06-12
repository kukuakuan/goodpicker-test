from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Province, User
from .models import Goods
# from .models import Rating
from .models import Comment
from .models import Chat
from .models import Category
from .models import Province
from .models import GoodsImage
from .models import Contact
from .models import Message
from .models import Budget
from .models import AnotherBudget

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = '__all__'

#User Serializer
class UserContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'userImage', 'id')

class ContactSerializer(serializers.ModelSerializer):
    partner = UserContactSerializer()
    
    class Meta:
        model = Contact
        fields = ('partner', 'chatId')

class UserSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(source="contact_set", many=True, read_only=True)
    userProvinceID = ProvinceSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name', 'userImage', 'userProvinceID', 'userPhoneNumber', 'contacts')

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            validated_data['name'],
            self.context.get('request').data.get('userProvinceID')
        )

        return user

#Login Serializer
class LoginSerializer(serializers.Serializer):
  email = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Thông tin đăng nhập không chính xác. Vui lòng thử lại.")

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('goodsCategoryID', 'goodsCategoryName')

class GoodsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsImage
        fields = '__all__'

class GoodsSerializer(serializers.ModelSerializer):
    images = GoodsImageSerializer(source='goodsimage_set', many=True, read_only=True)

    class Meta:
        model = Goods
        fields = ('goodsID', 'goodsCreateId', 'goodsName', 'goodsCategoryID', 'goodsDescription', 'goodsPrice', 'goodsStatus', 'goodsLocation', 'goodsUpdatedTime', 'images')
    
    def create(self, validated_data):
        images = self.context.get('request').FILES
        goods = Goods.objects.create(
            goodsName=validated_data.get('goodsName'),
            goodsCategoryID=validated_data.get('goodsCategoryID'),
            goodsDescription=validated_data.get('goodsDescription', ''),
            goodsPrice=validated_data.get('goodsPrice'),
            goodsLocation=validated_data.get('goodsLocation'),
            goodsCreateId=validated_data.get('goodsCreateId'),
        )

        for index, image in enumerate(images.values()):
            isMain = str(index) == self.context.get('request').data.get('mainIndex')
            GoodsImage.objects.create(goodsID=goods, image=image, isMain=isMain)
        return goods

# class RatingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Rating
#         fields = ('userID', 'goodsID', 'ratingScore')


class CommentSerializer(serializers.ModelSerializer):
    userID = UserContactSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('userID', 'goodsID', 'commentContent', 'commentTime')

    def create(self, validated_data):
        comment = Comment.objects.create(
            userID=User.objects.get(pk=self.context.get('request').data.get('userID')),
            goodsID=validated_data.get('goodsID'),
            commentContent=validated_data.get('commentContent')
        )
        return comment

class UserMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id')

class MessageSerializer(serializers.ModelSerializer):
    user = UserMessageSerializer()
    
    class Meta:
        model = Message
        fields = ('user', 'timestamp', 'content')

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id')

    def create(self, validated_data):
        participants = validated_data.get('participants')
        chat = Chat()
        chat.save()
        for user in participants:
            chat.participants.add(user)
            for partner in participants:
                if partner.id != user.id:
                    contact = Contact.objects.create(
                        userId=user,
                        partner=partner,
                        chatId=chat
                    )
        chat.save()
        return chat


class BudgetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Budget
        fields = '__all__'
        field = ('budgetId','version','company',
                 'status','createUser','createDate',
                'editUser','editDate','project',
                'voucherNumber','budgetProjectName','note',
                'totalBudgetBeforeTax','totalBudgetAfterTax','totalValueTax',
                'currencyType')


class AnotherBudgetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AnotherBudget
        fields = '__all__'
        field = ('budgetId','version','company',
                 'status','createUser','createDate',
                'editUser','editDate','project',
                'voucherNumber','budgetProjectName','note',
                'totalBudgetBeforeTax','totalBudgetAfterTax','totalValueTax',
                'currencyType')