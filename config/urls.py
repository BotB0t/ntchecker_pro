"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from knox import views as knox_views

from validator_notification.apps.accounts import views as accounts_views
from validator_notification.apps.device import views as device_views
from validator_notification.apps.notification import views as notification_views


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'device', device_views.DeviceViewSet, basename="DeviceViewSet")
router.register(r'notification/general', notification_views.GeneralNotificationViewSet,
                basename="GeneralNotificationViewSet")
router.register(r'notification', notification_views.IndividualNotificationViewSet,
                basename="IndividualNotificationViewSet")
router.register(r'auth/user', accounts_views.UserViewSet, basename="UserViewSet")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('validator_notification.frontend.urls')),
    path('auth', include('knox.urls')),
    path('auth/register', accounts_views.Register.as_view()),
    path('auth/login', accounts_views.Login.as_view()),
    path('auth/update/', accounts_views.Update.as_view()),
    # path('auth/user', accounts_views.User.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    url(r'^', include(router.urls)),
]
