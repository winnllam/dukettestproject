from django.conf.urls import url
from payments import views

urlpatterns = [
    url(r'^pay/$', views.pay),
]