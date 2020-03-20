import logging

from rest_framework import status as status_framework
from rest_framework import permissions, viewsets

from .models import User
from .serializers import UserSerializer


logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
