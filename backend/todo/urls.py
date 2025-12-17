from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import TodoViewSet, TodoGroupViewSet, OverdueTodoView, UserRegisterView, UserDeleteView

router = DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'groups', TodoGroupViewSet)

urlpatterns = [
    path('todos/overdue-count/', OverdueTodoView.as_view()),
    path('', include(router.urls)),
    path('auth/register/', UserRegisterView.as_view()),
    path('auth/login/', TokenObtainPairView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('auth/delete/', UserDeleteView.as_view()),
]
