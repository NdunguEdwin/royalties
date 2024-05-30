from django.db import models

# Create your models here.


class Payment(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    amount = models.IntegerField()
    phone = models.CharField(max_length=15)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name