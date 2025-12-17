from rest_framework import serializers
from .models import Todo, TodoGroup, CustomUser

class TodoSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    class Meta:
        model = Todo
        fields = ['id', 'name', 'checked', 'created_at', 'deadline', 'group', 'user', 'group_name']
        read_only_fields = ['created_at']

class TodoGroupSerializer(serializers.ModelSerializer):
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

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'created_at']
        read_only_fields = ['id', 'email', 'username', 'created_at']
