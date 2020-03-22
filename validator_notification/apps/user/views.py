import logging

from rest_framework import status as status_framework
from rest_framework import permissions, viewsets

from .models import User
from .serializers import UserSerializer


logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user.users.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
