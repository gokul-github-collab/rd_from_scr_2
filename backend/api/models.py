from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self) -> str:
        return self.title
    
class Course(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    description = models.TextField()
    location = models.CharField(max_length=100)
    # tuition_fee = models.CharField(max_length=20)

    def __str__(self):
        return self.name
    
class Syllabus(models.Model):
    year = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabus')
    

    def __str__(self) -> str:
        return self.year
    

class Semester(models.Model):
    title = models.CharField(max_length=100, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='semesters')
    syllabus  = models.ForeignKey(Syllabus, on_delete=models.CASCADE, related_name='sem')

    def __str__(self) -> str:
        return self.title + " - " + self.course.name
    
    

class Subject(models.Model):
    name = models.CharField(max_length=200)
    course_code = models.CharField(max_length=100, unique=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='subjects')
    ltpc = models.CharField(max_length=50, blank=True, null=True)
    prerequisite = models.CharField(max_length=300, blank=True, null=True)
    external_mark = models.IntegerField(blank=True, null=True)
    internal_mark = models.IntegerField(blank=True, null=True)
    t_or_p = models.CharField(max_length=50, choices=(("Theory", "Theory"), ("Practical", "Practical"), ("Theory and Practical", "Theory and Practical")), default="Theory" )

    def __str__(self) -> str:
        return self.name + " - " + self.semester.title + " - " + self.semester.syllabus.year

class CourseObjectives(models.Model):

    name = models.CharField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="cob")

    def __str__(self) -> str:
        return self.name + " - " + self.subject.name

class CourseOutcome(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    uap = models.CharField(max_length=100, choices=(("U", "Understanding"), ("AP", "Applying"), ( "AN","Analyzing"), ("R", "Remembering"), ( "C","Creating"), ( "E", "Evaluating")))
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="co")
    def __str__(self) -> str:
        return self.title 
    
class LabComponent(models.Model):

    lie = models.CharField(max_length=400)
    co_mapping = models.CharField(max_length=100)
    rbt = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="lab")

    def __str__(self) -> str:
        return self.lie[:20] + " - " + self.subject.name
    
class CourseContent(models.Model):

    title = models.CharField(max_length=100)
    description = models.TextField()
    hrs_pw = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="cc")


    def __str__(self) -> str:
        return self.title + " - " + self.subject.name
    
class TextBook(models.Model):

    name = models.CharField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="tb")

    def __str__(self) -> str:
        return self.name + " - " + self.subject.name
    
class ReferenceBook(models.Model):

    name = models.CharField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="rb")
    
    def __str__(self) -> str:
        return self.name + " - " + self.subject.name
    
class WebReference(models.Model):
    url = models.URLField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="wr")
    
    def __str__(self) -> str:
        return self.url + " - " + self.subject.name
    
class OnlineReference(models.Model):

    url = models.URLField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="oref")
    
    def __str__(self) -> str:
        return self.url + " - " + self.subject.name

class Po(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='pos')

    def __str__(self) -> str:
        return self.title + " - " + self.course.name
    

class Pso(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='psos')

    def __str__(self) -> str:
        return self.title + " - " + self.course.name