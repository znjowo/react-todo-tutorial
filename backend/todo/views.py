from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from .models import Todo, TodoGroup
from .serializers import TodoSerializer, TodoGroupSerializer, TodoGroupDetailSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        sort = self.request.query_params.get('sort')

        if sort:
            queryset = queryset.order_by(sort)

        return queryset

class TodoGroupViewSet(viewsets.ModelViewSet):
    queryset = TodoGroup.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TodoGroupDetailSerializer
        return TodoGroupSerializer

class OverdueTodoView(APIView):
    def get(self, request):
        count = Todo.objects.filter(
            deadline__lt=timezone.now(),
            checked=False
        ).count()

        return Response({'overdue_count': count})
