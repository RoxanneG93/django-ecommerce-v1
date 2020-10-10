from django.shortcuts import render
from .models import *

# Create your views here.
def store(request):
    template = 'store/store.html'
    products = Product.objects.all()
    context = {
        'products': products
    }
    return render(request, template, context)

def cart(request):
    template = 'store/cart.html'
    #items = []
    if request.user.is_authenticated:
        customer = request.user.customer
        # look more on how these two queries works
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
    else:
        # guest empty cart for non logged-in user
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0}

    context = {'items':items, 'order': order}
    return render(request, template, context)

def checkout(request):
    template = 'store/checkout.html'
    if request.user.is_authenticated:
        customer = request.user.customer
        # look more on how these two queries works
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
    else:
        # guest empty cart for non logged-in user
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0}

    context = {'items':items, 'order': order}
    return render(request, template, context)
