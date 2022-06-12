from django.contrib import admin
from .models import GoodsImage, Province, User, Goods, Comment, Chat, Category, Message, Contact, Budget, AnotherBudget

admin.site.site_header = "Trang trao đổi hàng hoá GoodsPicker"
admin.site.site_title = "Trang trao đổi hàng hoá GoodsPicker"

# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Province)
admin.site.register(GoodsImage)
admin.site.register(Goods)
# admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Contact)
admin.site.register(Budget)
admin.site.register(AnotherBudget)

