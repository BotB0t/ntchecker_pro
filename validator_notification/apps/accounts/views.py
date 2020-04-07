from django.http import HttpResponse
from rest_framework import generics, permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from knox.models import AuthToken

from validator_notification.apps.accounts.providers.providers import UserProvider
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class Register(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        query_params = request.query_params
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if query_params.get('superuser') == 'True':
            user = serializer.create_superuser(validated_data=serializer.validated_data)
        else:
            user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    @staticmethod
    def _get_provider(request):
        return UserProvider()

    def _get_users(self, response):
        serialized_response = UserSerializer(instance=response, many=True)
        data_response = {
            'users': serialized_response.instance
        }
        return Response(data_response, status=status.HTTP_200_OK)

    def list(self, request):
        provider = self._get_provider(self.request)
        response = provider.get_user(username=self.request.user.username)
        return self._get_users(response)

    @action(methods=['get'], detail=False, url_path='all')
    def get_all_queryset(self, request):
        self.permission_classes = [permissions.IsAdminUser]
        # query_params = request.query_params
        provider = self._get_provider(request)
        # if query_params.get('file') == 'csv':
        #     response = HttpResponse(content_type='text/csv')
        #     response['Content-Disposition'] = 'attachment; filename="export.csv"'
        #     response = provider.get_csv(response)
        # else:
        response = provider.get_user_all()
        response = self._get_users(response)
        return response
