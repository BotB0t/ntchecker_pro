import logging

from django.http import HttpResponse, JsonResponse
from rest_framework import status as status_framework
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from validator_notification.apps.notification.serializers import GeneralNotificationSerializer, \
    IndividualNotificationSerializer

from .models import GeneralNotification

logger = logging.getLogger(__name__)


class NotificationViewSet(ViewSet):

    # general_manager = GeneralNotificationManager()

    '''
    GENERAL notifications operations
    '''

    def retrieve(self, request, pk):
        try:
            general_notification = GeneralNotification.objects.get(item_id=pk)
        except GeneralNotification.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = GeneralNotificationSerializer(general_notification)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            serializer = GeneralNotificationSerializer(general_notification, data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            general_notification.delete()
            return HttpResponse(status=204)

    @action(methods=['post', 'get'], detail=False, url_path='all')
    def create_general(self, request):
        if request.method == 'GET':
            general_list = GeneralNotification.objects.all()
            serializer = GeneralNotificationSerializer(general_list, many=True)
            return JsonResponse(serializer.data, safe=False)

        serializer = GeneralNotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status_framework.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status_framework.HTTP_400_BAD_REQUEST)
