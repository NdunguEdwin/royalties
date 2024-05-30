from django.shortcuts import render
from rest_framework.views import APIView
from .models import Payment
from .serializers import PaymentSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class PaymentView(APIView):
    def get(self, request):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    def post(self, request):
        payment = request.data.get('payment')
        # serializer = PaymentSerializer(data=payment)
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)