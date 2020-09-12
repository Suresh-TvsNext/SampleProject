import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  sharableData: any = { employeeDatas: {},EmployeeDetails:{} }

  constructor(private http: HttpClient) { }

  getEmployeesList(): Observable<any> {
    let Url = environment.baseUrl + "867dbf74-3751-4f17-acec-514d13b8248f";
    return this.http.get(`${Url}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    var emplist = this.sharableData.employeeDatas.EmployeeList;
    emplist.push(employee);
    this.sharableData.employeeDatas = {
      EmployeeList: emplist,
    }
    return emplist;
  }

  deleteEmployee(id: number) {
    var list = this.sharableData.employeeDatas.EmployeeList;
    const filteredPeople = list.filter(item => item.id !== id);
    this.sharableData.employeeDatas = {
      EmployeeList: filteredPeople,
    }
  }

  // getEmployee(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  // updateEmployee(id: number, value: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}/${id}`, value);
  // }



}
