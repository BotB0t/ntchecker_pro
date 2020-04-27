from django.db import models
from django.contrib.auth.models import User as DjangoUser
from .utils.enumerations import platform, owner

from validator_notification.apps.utils.helpers.data_mask import get_str_with_mask


class Device(models.Model):
    name = models.CharField(max_length=50, null=True)
    tlf = models.CharField(max_length=50, null=False)
    platform = models.CharField(max_length=50, null=False, choices=platform.tuples())
    owner = models.CharField(max_length=50, null=False, choices=owner.tuples())
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(DjangoUser, related_name="devices", on_delete=models.CASCADE, null=True)
    device = models.CharField(max_length=50, null=True)
    os_family = models.CharField(max_length=50, null=True)
    os_version = models.CharField(max_length=50, null=True)
    onesignal_id = models.CharField(max_length=50, null=True)

    def get_tlf_with_mask(self) -> str:
        return get_str_with_mask(tail_to_convert=self.tlf, mask_symbol='*', n_unmaskchar=4)

    def get_onesignal_id_with_mask(self) -> str:
        return get_str_with_mask(tail_to_convert=self.onesignal_id or '', mask_symbol='*', n_unmaskchar=6)
