from django.contrib import admin
from .models import CustomUser, Todo, TodoGroup, Tag

admin.site.register(CustomUser)
admin.site.register(Todo)
admin.site.register(TodoGroup)
admin.site.register(Tag)
