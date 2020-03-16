import logging

from rest_framework import status as status_framework
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action

logger = logging.getLogger(__name__)


class DeviceViewSet(ViewSet):

    device_manager = DeviceManager()

    def create(self, request, *args, **kwargs):
        serializer = CreateDeviceSerializer(data=request.data)
        if not serializer.is_valid():
            logger.error('Device: CREATE Invalid input - {}'.format(serializer.error_messages)
            raise ValidatorError(serializer.errors)
        logger.info('Device: create request - data: {}'.format(serializer.data))
        return Response(self.device_manager.create(data=serializer.validated_data),
                        status=status_framework.HTTP_201_CREATED)
