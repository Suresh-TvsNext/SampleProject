import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private employeeService: EmployeeService,) {  }


  getUserList() :Observable<any> {
    let Url = environment.baseUrl + "f39039a4-8eb4-470f-afb5-34998df1d211";
    return this.http.get(`${Url}`);
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }

}


