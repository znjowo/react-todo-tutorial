from django.contrib import admin
from .models import CustomUser, Todo, TodoGroup

admin.site.register(CustomUser)
admin.site.register(Todo)
admin.site.register(TodoGroup)
