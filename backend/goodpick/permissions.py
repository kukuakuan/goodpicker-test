from rest_framework.permissions import BasePermission, SAFE_METHODS

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsParticipants(BasePermission):
    def has_permission(self, request, view):
        return request.auth is not None

    def has_object_permission(self, request, view, obj):
        return obj.participants.filter(username=request.user.username).exists()