import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserService } from './user/service/user.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data/data.service';
import { UserListComponent } from './admin/crud/user/user-list/user-list.component';
import { UserFormComponent } from './admin/crud/user/user-form/user-form.component';
import { GuestGuard } from './auth/guard/guest.guard';
import { UserGuard } from './auth/guard/user.guard';
import { AdminGuard } from './auth/guard/admin.guard';
import { CourseListComponent } from './admin/crud/course/course-list/course-list.component';
import { CourseFormComponent } from './admin/crud/course/course-form/course-form.component';
import { CourseListFrontComponent } from './course/component/course-list-front/course-list-front.component';
import { CourseDetailsComponent } from './course/component/course-details/course-details.component';
import { CourseService } from './course/service/course.service';
import { EnrollmentRateService } from './misc/enrollment-rate.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', canActivate: [GuestGuard], children: [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]},
  { path: 'courses', component: CourseListFrontComponent },
  { path: 'courses/:id', canActivate: [UserGuard], component: CourseDetailsComponent },
  { path: 'admin', canActivate: [AdminGuard], children: [
    { path: 'courses', component: CourseListComponent },
    { path: 'courses/:id', component: CourseFormComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', component: UserFormComponent },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    UserListComponent,
    UserFormComponent,
    CourseListComponent,
    CourseFormComponent,
    CourseListFrontComponent,
    CourseDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(DataService),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CourseService,
    EnrollmentRateService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
