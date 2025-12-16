from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, TodoGroupViewSet, OverdueTodoView

router = DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'groups', TodoGroupViewSet)

urlpatterns = [
    path('todos/overdue-count/', OverdueTodoView.as_view()),
    path('', include(router.urls)),
]
