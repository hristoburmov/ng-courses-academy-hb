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
import { AdminGuard } from './auth/guard/admin.guard';
import { GuestGuard } from './auth/guard/guest.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', canActivate: [GuestGuard], children:[
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]},
  { path: 'admin', canActivate: [AdminGuard], children: [
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
    UserFormComponent
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
