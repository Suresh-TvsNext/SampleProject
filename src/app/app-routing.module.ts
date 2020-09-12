import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent , canActivate: [AuthGuard]},
  { path: 'add/:id', component: CreateEmployeeComponent , canActivate: [AuthGuard]},
  { path: 'details/:id', component: EmployeeDetailsComponent , canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
