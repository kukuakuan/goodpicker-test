from urllib import response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.shortcuts import render
from knox.auth import TokenAuthentication
from .serializers import UserSerializer
from .serializers import GoodsSerializer
# from .serializers import RatingSerializer
from .serializers import CommentSerializer
from .serializers import ChatSerializer
from .serializers import CategorySerializer
from .serializers import ProvinceSerializer
from .serializers import GoodsImageSerializer
from .serializers import BudgetSerializer
from .serializers import AnotherBudgetSerializer
from .models import User
from .models import Goods
# from .models import Rating
from .models import Comment
from .models import Chat
from .models import Category
from .models import Province
from .models import GoodsImage
from .models import Budget
from .permissions import ReadOnly, IsParticipants

# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ProvinceView(viewsets.ModelViewSet):
    serializer_class = ProvinceSerializer
    queryset = Province.objects.all()

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class GoodsImageView(viewsets.ModelViewSet):
    serializer_class = GoodsImageSerializer
    queryset = GoodsImage.objects.all()

class GoodsView(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated|ReadOnly]
    serializer_class = GoodsSerializer
    pagination_class = LimitOffsetPagination
    queryset = Goods.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = {
        'goodsCategoryID': ['exact'],
        'goodsStatus': ['exact'],
        'goodsCreateId': ['exact'],
        'goodsPrice': ['gte', 'lte'],
        'goodsLocation': ['exact'],
        'goodsUpdatedTime': ['gte', 'lte']
        
    }
    search_fields = ['goodsName']
    ordering_fields = ['goodsUpdatedTime', 'goodsPrice']

# class RatingView(viewsets.ModelViewSet):
#     serializer_class = RatingSerializer
#     queryset = Rating.objects.all()


class CommentView(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated|ReadOnly]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class ChatView(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    permission_classes = [IsParticipants]

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            user = User.objects.get(username=username)  
            queryset = user.chats.all()
        return queryset

class BudgetView(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    # permission_classes = [IsParticipants]

    queryset = Budget.objects.all()

    # def patch(self, request, pk=None):
    #     return HttpResponse({'method':'patch'})

    # def delete(self, request, pk=None):
    #     return HttpResponse({'method':'delete'})

class AnotherBudgetView(viewsets.ModelViewSet):
    serializer_class = AnotherBudgetSerializer
    # permission_classes = [IsParticipants]

    queryset = Budget.objects.all()
