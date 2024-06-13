from django.shortcuts import render
from django.http import JsonResponse
import razorpay
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def pay(request, amt):
    amount = int(amt) * 100  # Convert amount to paise
    data = {"amount": amount, "currency": "INR", "receipt": "order_rcptid_11"}
    client = razorpay.Client(auth=("rzp_test_KFq3RmFXb4XMtO", "fPEb7YdAF0WqeCTMM1EeoQ9M"))
    order = client.order.create(data=data)
    return JsonResponse(order)


def home(request):
    return render(request, 'index.html')


def success_view(request):
    return render(request, "page2.html")
    # return JsonResponse({"message": "Payment successful"})
