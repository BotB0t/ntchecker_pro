import logging

from rest_framework import status as status_framework
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

logger = logging.getLogger(__name__)


class UserViewSet(ViewSet):

    @action(methods=['post'], detail=False, url_path='profile-info')
    def profile_info(self, request, *args, **kwargs):
        username = request.data['data'].get('username', '')
        logger.info(f'User/profile-info: login: {username}')

        return Response({'username': username}, status=status_framework.HTTP_200_OK)
