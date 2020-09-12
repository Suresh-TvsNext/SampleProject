import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "./../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  ispage: string;
  isID: number;
  showModal: boolean;
  UserId: string;
  Firstname: string;
  Lastname: string;
  Email: string;


  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    if (this.employeeService.sharableData.employeeDatas.EmployeeList != undefined) {
      this.employees = this.employeeService.sharableData.employeeDatas.EmployeeList;
    }
    else { this.loadData(); }
  }

  loadData() {
    this.employeeService.getEmployeesList()
      .subscribe(data => {
        console.log(data)
        this.employees = data;
        this.employeeService.sharableData.employeeDatas = {
          EmployeeList: data,
        }
      }, error => console.log(error));
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
    this.employees = this.employeeService.sharableData.employeeDatas.EmployeeList;
  }

  empList(emplist: any) {
    emplist.sort(function (a, b) {
      return a.id - b.id;
    });
    this.employees = emplist;
  }


  onClick(ispage, id) {
    this.ispage = '';
    switch (ispage) {
      case "create":
        this.ispage = "create";
        break;
      case "details":
        this.ispage = "details";
        break;
      case "Update":
        this.ispage = "create";
        break;
    }
    this.isID = id;
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.ispage = '';
    this.showModal = false;
  }
}
