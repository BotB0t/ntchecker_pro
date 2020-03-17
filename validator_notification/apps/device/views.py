import logging

from django.http import JsonResponse, HttpResponse
from rest_framework import status as status_framework
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser


from .serializers import CreateDeviceSerializer, DeviceSerializer, GetByUserIDDeviceSerializer
from .models import Device

logger = logging.getLogger(__name__)


class DeviceViewSet(ViewSet):

    def create(self, request):
        serializer = CreateDeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('Device: create request - data: {}'.format(serializer.data))
            return Response(serializer.data, status=status_framework.HTTP_201_CREATED)
        logger.error('Device: CREATE Invalid input - {}'.format(serializer.error_messages))
        return JsonResponse(serializer.errors, status=status_framework.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False, url_path='get')
    def get_devices(self, request):
        serializer_data = GetByUserIDDeviceSerializer(data=request.data)
        if serializer_data.is_valid():
            if serializer_data.validated_data.get('id'):
                devices = Device.objects.filter(username=serializer_data.validated_data['username'],
                                                id=serializer_data.validated_data['id'])
            else:
                devices = Device.objects.filter(username=serializer_data.validated_data['username'])
            serializer = DeviceSerializer(devices, many=True)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer_data.errors, status=status_framework.HTTP_400_BAD_REQUEST)

    @action(methods=['put'], detail=False, url_path='update')
    def update_device(self, request):
        data = JSONParser().parse(request)
        try:
            device = Device.objects.get(pk=data.get('id'), username=data.get('username'))
        except Device.DoesNotExist:
            return JsonResponse({'error': 'Device not found'}, status=400)
        serializer = DeviceSerializer(device, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    @action(methods=['delete'], detail=False, url_path='delete')
    def delete_device(self, request):
        data = JSONParser().parse(request)
        try:
            device = Device.objects.get(pk=data.get('id'), username=data.get('username'))
            device.delete()
            return HttpResponse(status=204)
        except Device.DoesNotExist:
            return JsonResponse({'error': 'Device not found'}, status=400)
