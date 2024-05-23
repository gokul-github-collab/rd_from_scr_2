from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Course, Po, LabComponent, Pso, Semester, Subject, Syllabus, CourseOutcome, CourseContent, TextBook, ReferenceBook, WebReference, OnlineReference, CourseObjectives


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]

        extra_kwargs = {"author": {"read_only": True}}
class CourseOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOutcome
        fields = ("id", "title", "description", "uap", "subject")

class CourseContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseContent
        fields = ("id",  "title", "description", "hrs_pw", "subject")

class TextBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBook
        fields = ("id", "name", "subject")

class ReferenceBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenceBook
        fields = ("id", "name", "subject")

class WebReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebReference
        fields = ("id", "url", "subject")

class OnlineReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineReference
        fields = ("id", "url", "subject")

class CourseObjectivesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseObjectives
        fields = ("id", "name", "subject")

class LabComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabComponent
        fields =  ("id", "lie", "co_mapping", "rbt", "subject")

class SubjectSerializer(serializers.ModelSerializer):
    cob = CourseObjectivesSerializer(many=True, read_only=True)
    co = CourseOutcomeSerializer(many=True, read_only=True)
    cc = CourseContentSerializer(many=True, read_only=True)
    tb = TextBookSerializer(many=True, read_only=True)
    rb = ReferenceBookSerializer(many=True, read_only=True)
    wr = WebReferenceSerializer(many=True, read_only=True)
    oref = OnlineReferenceSerializer(many=True, read_only=True)
    lab = LabComponentSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ("id", "name", "course_code", "semester", "ltpc", "prerequisite", "external_mark", "internal_mark", "t_or_p", "cob", "co", "cc", 'tb', 'rb', 'wr', 'oref', "lab" )



class SemesterSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model =  Semester
        fields = ("id", "title", "course", 'syllabus', "subjects")


class SyllabusSerializer(serializers.ModelSerializer):
    sem = SemesterSerializer(many=True, read_only=True)

    class Meta:
        model = Syllabus
        fields = ("id", "year", "course", "sem")

class SemesterSylSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)
    sem  = SyllabusSerializer(many=True, read_only=True)

    class Meta:
        model =  Semester
        fields = ("id", "title",  "course", "subjects", 'sem')

class PoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Po
        fields = ('id', 'title', 'description', 'course')

class PsoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pso
        fields = ('id', 'title', 'description', 'course')

class CourseSerializer(serializers.ModelSerializer):
    pos = PoSerializer(many=True, read_only=True)  
    psos = PoSerializer(many=True, read_only=True)  
    syllabus = SyllabusSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ('id', 'name', 'type', 'description', 'location', 'pos', 'psos', "syllabus")

