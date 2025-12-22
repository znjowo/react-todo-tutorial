from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='メールアドレス',
        max_length=255,
        unique=True,
    )
    username = models.CharField(
        verbose_name='ユーザー名',
        max_length=150,
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'ユーザー'
        verbose_name_plural = 'ユーザー一覧'

class TodoGroup(models.Model):
    name = models.CharField(
        verbose_name='グループ名',
        max_length=100,
    )
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='todo_groups',
        verbose_name='ユーザー',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Todoグループ'
        verbose_name_plural = 'Todoグループ一覧'

    def __str__(self):
        return self.name

class Todo(models.Model):
    name = models.CharField(
        verbose_name='タスク名',
        max_length=64,
    )
    checked = models.BooleanField(
        verbose_name='チェック',
        default=False,
    )
    created_at = models.DateTimeField(
        verbose_name='作成日時',
        auto_now_add=True,
    )
    deadline = models.DateTimeField(
        verbose_name='期限',
        null=True,
        blank=True,
    )
    group = models.ForeignKey(
        TodoGroup,
        on_delete=models.SET_NULL,
        related_name='todos',
        verbose_name='Todoグループ',
        null=True,
        blank=True,
    )
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='todos',
        verbose_name='ユーザー',
    )

    class Meta:
        verbose_name = 'Todo'
        verbose_name_plural = 'Todo一覧'

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(
        verbose_name='タグ名',
        max_length=30,
    )
    todos = models.ManyToManyField(
        Todo,
        related_name='tags',
        verbose_name='Todos',
    )

    class Meta:
        verbose_name = 'タグ'
        verbose_name_plural = 'タグ一覧'

    def __str__(self):
        return self.name
