from django.urls import path
from .views import home, pay, success_view

urlpatterns = [
    path('', home, name='home'),
    path('success_view/', success_view, name='success_view'),
    path('pay/<amt>/', pay, name='pay'),
]
