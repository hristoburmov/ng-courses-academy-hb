import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Course from 'src/app/course/model/course.model';
import { CourseService } from 'src/app/course/service/course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  courseForm: FormGroup = this.onGetCourse(new Course());

  constructor(private courseService: CourseService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'] != 'add') {
        const id: number = Number(params['id']);
        if(Number.isNaN(id)) {
          this.router.navigateByUrl('/admin/users');
        } else {
          this.courseService.getCourse(id).subscribe((course) => {
            this.onGetCourse(course);
          });
        }
      }
    });
  }

  // Update user form, when user is retrieved from DB
  onGetCourse(course: Course): FormGroup {
    this.courseForm = this.formBuilder.group({
      id: [course.id],
      title: [course.title, [Validators.required, Validators.minLength(10)]],
      description: [course.description, [Validators.required, Validators.minLength(20)]]
    });
    return this.courseForm;
  }

  // Save
  onSave(): void {
    this.courseService.postCourse(this.courseForm.value).subscribe((data) => {
      this.router.navigateByUrl('/admin/courses');
    });
  }

  // Getters
  get id() {
    return this.courseForm.get('id');
  }
  get title() {
    return this.courseForm.get('title');
  }
  get description() {
    return this.courseForm.get('description');
  }

}
