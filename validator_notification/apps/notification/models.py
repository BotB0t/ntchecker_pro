from django.db import models

# Create your models here.


class GeneralNotification(models.Model):
    item_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=100, null=False)
    url = models.CharField(max_length=1000, null=True)
    img = models.CharField(max_length=1000, null=True)
    start_date = models.DateTimeField(null=False)
    end_date = models.DateTimeField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
