import { Component, OnInit } from '@angular/core';
import Course from 'src/app/course/model/course.model';
import { CourseService } from 'src/app/course/service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  onDelete(id: number): void {
    const index: number = this.courses.findIndex((course) => course.id === id);
    if(index !== -1) {
      this.courses.splice(index, 1);
      this.courseService.deleteCourse(id).subscribe();
    }
  }

}
