from rest_framework import serializers
from .models import Todo, TodoGroup

class TodoSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    class Meta:
        model = Todo
        fields = ['id', 'name', 'checked', 'created_at', 'deadline', 'group', 'user', 'group_name']
        read_only_fields = ['created_at']

class TodoGroupSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = TodoGroup
        fields = ['id', 'name', 'created_at', 'user']
        read_only_fields = ['created_at']

class TodoGroupDetailSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = TodoGroup
        fields = ['id', 'name', 'created_at', 'user', 'todos']
        read_only_fields = ['created_at']
