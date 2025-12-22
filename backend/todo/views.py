from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from .models import Todo, TodoGroup, Tag
from .serializers import TodoSerializer, TodoGroupSerializer, TodoGroupDetailSerializer, UserRegisterSerializer, UserSerializer, TagSerializer

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Tag.objects.none()
        return Tag.objects.all()

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Todo.objects.none()
        queryset = Todo.objects.filter(user=self.request.user)
        sort = self.request.query_params.get('sort')
        if sort:
            queryset = queryset.order_by(sort)

        return queryset

    # 保存時にユーザーを設定
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TodoGroupViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return TodoGroup.objects.none()
        return TodoGroup.objects.filter(user=self.request.user)

    # idを指定した場合は詳細Serializerを返す
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TodoGroupDetailSerializer
        return TodoGroupSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OverdueTodoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Todo.objects.filter(
            user=request.user,
            deadline__lt=timezone.now(),
            checked=False
        ).count()

        return Response({'overdue_count': count})

class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
