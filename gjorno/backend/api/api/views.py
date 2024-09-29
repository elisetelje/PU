from rest_framework import mixins, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Activity, UserProfile
from .serializers import (
    ActivitySerializer,
    CreateActivitySerializer,
    CreateUserProfileSerializer,
    ParticipantSerializer,
    UserProfileSerializer,
    UserSerializerWithToken,
)


class ActivityViewSet(viewsets.ModelViewSet, mixins.UpdateModelMixin):
    queryset = Activity.objects.all()
    permissions = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ActivitySerializer

    def create(self, request):
        serializer = CreateActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParticipantView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, activity_pk, user_profile_pk):
        activity = Activity.objects.get(pk=activity_pk)
        user_profile = UserProfile.objects.get(pk=user_profile_pk)
        activity.participants.add(user_profile)
        serializer = ParticipantSerializer(activity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, activity_pk, user_profile_pk):
        activity = Activity.objects.get(pk=activity_pk)
        user_profile = UserProfile.objects.get(pk=user_profile_pk)
        activity.participants.remove(user_profile)
        serializer = ParticipantSerializer(activity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(viewsets.ModelViewSet, mixins.UpdateModelMixin):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        serializer = CreateUserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        return self.request.user.user_profile

    """
    Overrides the current queryset to retrieve the current user logged in
    """

    def get_queryset(self):
        if self.action == "list":
            return self.queryset.filter(user=self.request.user)
        return self.queryset
