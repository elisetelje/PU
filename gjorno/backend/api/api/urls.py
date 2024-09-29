from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from .views import ActivityViewSet, ParticipantView, UserList, UserProfileViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"activities", ActivityViewSet)
router.register(r"userprofiles", UserProfileViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
    path("admin/", admin.site.urls),
    path("token-auth/", obtain_jwt_token),
    path("users/", UserList.as_view()),
    path(
        "participant/<int:activity_pk>/<int:user_profile_pk>/",
        ParticipantView.as_view(),
    ),
]
