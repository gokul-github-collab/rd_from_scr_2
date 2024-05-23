from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),    
path('check_user_logged_in/', views.CheckUserLoggedInView.as_view(), name='check_user_logged_in'),

    path('check_superuser/', views.CheckSuperUser.as_view(), name='check_superuser'),
    path('courses/', views.CoureListView.as_view(), name='courses'),
    path("courses/<int:pk>/", views.CourseDetailView.as_view(), name='course-detail'),
    path("courses/delete/<int:pk>/", views.CourseDelete.as_view(), name="course-delete"),  


    path("pos/", views.PoCreateListView.as_view(), name="po-list"),
    path("pos/<int:pk>/", views.PoDetail.as_view(), name="po"),
    path("pos/delete/<int:pk>/", views.PoDelete.as_view(), name="po-delete"),

    path("psos/", views.PsoCreateListView.as_view(), name="pso-list"),
    path("psos/<int:pk>/", views.PsoDetail.as_view(), name="pso"),
    path("psos/delete/<int:pk>/", views.PsoDelete.as_view(), name="pso-delete"),

    path("syllabus/", views.SyllabusListView.as_view(), name='syllabus-list'),
    path("syllabus/<int:pk>/", views.SyllabusDetailView.as_view(), name='syllabus-detail'), 
    path("syllabus/delete/<int:pk>/", views.SyllabusDeleteView.as_view(), name='syllabus-delete'), 

    path("semester/", views.SemesterListView.as_view(), name='semester-list'),
    path("semester/<int:pk>/", views.SemesterDetailView.as_view(), name='semester-detail'), 
    path("semester/delete/<int:pk>/", views.SemesterDelete.as_view(), name='semester-delete'), 

    path('semester/<int:semester_id>/subjects/', views.SubjectsBySemesterView.as_view(), name='subjects-by-semester'),

    path("subject/", views.SubjectListView.as_view(), name='subject-list'),
    path("subject/<int:pk>/", views.SubjectDetailView.as_view(), name='subject-detail'), 
    path("subject/delete/<int:pk>/", views.SubjectDelete.as_view(), name='subject-delete'), 
    path('t_or_p_choices/', views.TORPChoiceAPIView.as_view(), name='t_or_p_choices'),


    path("course-objective/", views.CourseObjectivesListView.as_view(), name='course-objectives-list'),
    path("course-objective/<int:pk>/", views.CourseObjectivesDetailView.as_view(), name='course-objectives-detail'),
    path("course-objective/delete/<int:pk>/", views.CourseObjectivesDeleteView.as_view(), name='course-objectives-delete'),


    path("course-outcome/", views.CourseOutcomeListView.as_view(), name='course-outcome-list'),
    path("course-outcome/<int:pk>/", views.CourseOutcomeDetailView.as_view(), name='course-outcome-detail'),
    path("course-outcome/delete/<int:pk>/", views.CourseOutcomeDeleteView.as_view(), name='course-outcome-delete'),
    path("filter-course-outcome/<int:pk>/", views.FilterCourseOutcome.as_view(), name='subject-co-filter'),


    path("course-content/", views.CourseContentListView.as_view(), name='course-content-list'),
    path("course-content/<int:pk>/", views.CourseContentDetailView.as_view(), name='course-content-detail'),
    path("course-content/delete/<int:pk>/", views.CourseContentDeleteView.as_view(), name='course-content-delete'),

    path("text-book/", views.TextBookListView.as_view(), name='text-book-list'),
    path("text-book/<int:pk>/", views.TextBookDetailView.as_view(), name='text-book-detail'),
    path("text-book/delete/<int:pk>/", views.TextBookDeleteView.as_view(), name='text-book-delete'),

    path("reference-book/", views.ReferenceBookListView.as_view(), name='reference-book-list'),
    path("reference-book/<int:pk>/", views.ReferenceBookDetailView.as_view(), name='reference-book-detail'),
    path("reference-book/delete/<int:pk>/", views.ReferenceBookDeleteView.as_view(), name='reference-book-delete'),


    path("web-reference/", views.WebReferenceListView.as_view(), name='web-reference-list'),
    path("web-reference/<int:pk>/", views.WebReferenceDetailView.as_view(), name='web-reference-detail'),
    path("web-reference/delete/<int:pk>/", views.WebReferenceDeleteView.as_view(), name='web-reference-delete'),

    path("online-reference/", views.OnlineReferenceListView.as_view(), name='online-reference-list'),
    path("online-reference/<int:pk>/", views.OnlineReferenceDetailView.as_view(), name='online-reference-detail'),
    path("online-reference/delete/<int:pk>/", views.OnlineReferenceDeleteView.as_view(), name='online-reference-delete'),


    path("lab-component/", views.LabComponentListView.as_view(), name='lab-component-list'),
    path("lab-component/<int:pk>/", views.LabComponentDetailView.as_view(), name='lab-component-detail'),
    path("lab-component/delete/<int:pk>/", views.LabComponentDeleteView.as_view(), name='lab-component-delete'),
]