from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import IndividualNotification, GeneralNotification


@admin.register(IndividualNotification)
@admin.register(GeneralNotification)
class ViewAdmin(ImportExportModelAdmin):
    pass
