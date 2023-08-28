from dukettestproject import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import stripe

stripe.api_key = settings.SECRET_KEY

@api_view(['POST'])
def pay(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    msg = ''
    
    # check if customer with email exists
    customer_data = stripe.Customer.list(email=email).data  
    if len(customer_data) == 0:
        customer = stripe.Customer.create(
            email=email, 
            payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        msg = "Customer already exists."
    
    # create payment intent
    stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='cad',
        amount=500,
        confirm=True,
        automatic_payment_methods={"enabled": True, "allow_redirects": "never"}
    )
        
    return Response(
        status=status.HTTP_200_OK, 
        data={
            'message': 'Success', 
            'data': {'customer_id': customer.id, 'msg': msg }
        }
    )     