import logging

from rest_framework import status as status_framework
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from validator_notification.apps.user.serializers import CreateUserSerializer
from validator_notification.apps.user.user_manager import UserManager

logger = logging.getLogger(__name__)


class UserViewSet(ViewSet):

    user_manager = UserManager()

    @action(methods=['post'], detail=False, url_path='sign-up')
    def sign_up(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if not serializer.is_valid():
            logger.error('User: CREATE Invalid input - {}'.format(serializer.error_messages))
            raise ValidationError(serializer.errors)
        logger.info('User: create request')
        return Response(self.user_manager.create_user(data=serializer.validated_data),
                        status=status_framework.HTTP_201_CREATED)

    # @action(methods=['post'], detail=False, url_path='profile-info')
    # def profile_info(self, request, *args, **kwargs):
    #     username = request.data['data'].get('username', '')
    #     logger.info(f'User: profile-info: login: {username}')

    #     user = self.user_provider.login(username)

    #     logger.info(f'User/Info: success: {username}')
    #     serializer = UserInfoSerializer(user)
    #     return Response(serializer.data, status=status_framework.HTTP_200_OK)

        # serializer = CreateDeviceSerializer(data=request.data)
        # if not serializer.is_valid():
        #     logger.error('Device: CREATE Invalid input - {}'.format(serializer.error_messages)
        #     raise ValidatorError(serializer.errors)
        # logger.info('Device: create request - data: {}'.format(serializer.data))
        # return Response(self.device_manager.create(data=serializer.validated_data),
        #                 status=status_framework.HTTP_201_CREATED)
