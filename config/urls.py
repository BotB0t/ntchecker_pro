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

from validator_notification.apps.nt import views as nt_views
from validator_notification.apps.user import views as user_views
from validator_notification.apps.notification import views as notification_views


router = routers.DefaultRouter(trailing_slash=False)

router.register(r'', nt_views.NTViewSet, basename="NTViewSet")
router.register(r'notification', notification_views.NotificationViewSet, basename="NotificationViewSet")
router.register(r'user', user_views.UserViewSet, basename="UserViewSet")

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
]
