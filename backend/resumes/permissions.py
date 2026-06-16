from rest_framework.exceptions import PermissionDenied


def get_active_resume(resume_id):
    from .models import Resume
    return Resume.objects.filter(id=resume_id, is_archived=False).first()


def can_read_resume(user, resume):
    if not resume:
        return False
    if resume.user_id is None:
        return True
    return user.is_authenticated and resume.user_id == user.id


def can_write_resume(user, resume):
    if not resume:
        return False
    if resume.user_id is None:
        return True
    return user.is_authenticated and resume.user_id == user.id


def assert_can_read(user, resume):
    if not can_read_resume(user, resume):
        raise PermissionDenied("You do not have access to this resume.")


def assert_can_write(user, resume):
    if not can_write_resume(user, resume):
        raise PermissionDenied("You cannot edit this resume.")
