from django.db import models

# Create your models here.


class Notification(models.Model):
    title = models.CharField(max_length=100, null=False)
    url = models.CharField(max_length=1000, null=True)
    img = models.CharField(max_length=1000, null=True)
    notification_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
