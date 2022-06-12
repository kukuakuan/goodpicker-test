"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from goodpick import views
from goodpick.api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'goodpick')
router.register(r'categories', views.CategoryView, 'goodpick')
router.register(r'provinces', views.ProvinceView, 'goodpick')
router.register(r'goodsimages', views.GoodsImageView, 'goodpick')
router.register(r'goods', views.GoodsView, 'goodpick')
# router.register(r'ratings', views.RatingView, 'goodpick')
router.register(r'comments', views.CommentView, 'goodpick')
router.register(r'chats', views.ChatView, 'goodpick')
router.register(r'budgets', views.BudgetView, 'goodpick')
router.register(r'anotherbudgets', views.AnotherBudgetView, 'goodpick')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)