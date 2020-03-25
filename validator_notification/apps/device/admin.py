from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Device


@admin.register(Device)
class ViewAdmin(ImportExportModelAdmin):
    pass
