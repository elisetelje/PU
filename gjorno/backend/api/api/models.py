from django.contrib.auth.models import User
from django.db import models
from django.db.models.deletion import CASCADE


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE, related_name="user_profile")
    is_organization = models.BooleanField(default=False, blank=True, null=True)

    class Meta:
        app_label = "api"


class Activity(models.Model):
    title = models.CharField(max_length=150)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(default="")
    date = models.DateTimeField(null=True)
    author = models.ForeignKey(UserProfile, on_delete=CASCADE, default=1)
    participants = models.ManyToManyField(
        UserProfile, related_name="participates_in", blank=True
    )

    class ActivityGenre(models.TextChoices):
        ANNET = "Annet"
        TUR = "Tur"
        LOP = "Løping"
        ATTRAKSJON = "Attraksjon"

    genre = models.CharField(
        max_length=10,
        choices=ActivityGenre.choices,
        default=ActivityGenre.ANNET,
    )

    class Meta:
        verbose_name_plural = "Activities"
        app_label = "api"

    def __str__(self):
        return self.title
