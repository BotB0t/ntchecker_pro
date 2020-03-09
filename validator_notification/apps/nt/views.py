from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
# Create your views here.


class NTViewSet(ViewSet):

    @action(methods=['get'], detail=True, url_path='/')
    def ntchecker(request):
        return render(
            request,
            'notificationchecker/notificationchecker.html'
        )
