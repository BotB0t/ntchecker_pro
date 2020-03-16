from django.db import models

# Create your models here.


class NTChecker(models.Model):
    user = models.CharField(max_length=100, null=False)
    option_selected = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.user
