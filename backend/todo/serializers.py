from rest_framework import serializers
from .models import Todo, TodoGroup, CustomUser, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class TodoSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
        required=False,
    )

    class Meta:
        model = Todo
        fields = ['id', 'name', 'checked', 'created_at', 'deadline', 'group', 'user', 'group_name', 'tags', 'tag_ids']
        read_only_fields = ['created_at', 'user']

    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        todo = super().create(validated_data)
        for tag in tag_ids:
            tag.todos.add(todo)
        return todo

    def update(self, instance, validated_data):
        tag_ids = validated_data.pop('tag_ids', None)
        todo = super().update(instance, validated_data)
        if tag_ids is not None:
            # 既存のタグを全て削除して新しいタグを設定
            instance.tags.clear()
            for tag in tag_ids:
                tag.todos.add(todo)
        return todo

class TodoGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoGroup
        fields = ['id', 'name', 'created_at', 'user']
        read_only_fields = ['created_at', 'user']

class TodoGroupDetailSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = TodoGroup
        fields = ['id', 'name', 'created_at', 'user', 'todos']
        read_only_fields = ['created_at', 'user']

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
