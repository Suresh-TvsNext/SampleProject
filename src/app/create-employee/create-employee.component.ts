import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  outputEmpList: any;
  submitted = false;
  submittedYes = false;
  EmployeeForm: FormGroup;
  Emptypes: any = [];
  id: number;
  title: string = "Create Employee";
  @Input() inputId: number;
  @Output() getEmpData = new EventEmitter<string>();
  AlertMessage: string = "";

  constructor(
    private employeeService: EmployeeService, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.inputId;
    if (this.id > 0) {
      this.employee = this.employeeService.sharableData.employeeDatas.EmployeeList.find(emp => emp.id == this.id);
      this.title = "Edit Employee";
    }
    this.Emptypes = [
      { value: 1, name: "Permanent" },
      { value: 2, name: "Contract" },
    ]


    this.EmployeeForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      type: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      gender: ['', Validators.required],
      salary: ['', Validators.required],
    });


  }
  get f() { return this.EmployeeForm.controls; }

  getID() {
    var arry = this.employeeService.sharableData.employeeDatas.EmployeeList;
    var val = Math.max.apply(Math, arry.map(function (o) { return o.id; }));
    return val = val + 1;
  }


  onSubmit() {
    this.submitted = true;
    let IDval = this.getID();
    this.EmployeeForm.controls["id"].setValue(IDval);
    this.EmployeeForm.patchValue({ active: 1 });
    if (this.EmployeeForm.invalid) {
      this.submittedYes = false;
      return false;
    }
    else {
      if (this.id > 0) {
        this.editEmployee();
      }
      else { this.saveEmployee(); }
    }
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.EmployeeForm.value);
    this.employee = new Employee();
    this.submittedYes = true;
    this.AlertMessage = "You submitted successfully!";
  }

  editEmployee() {
    this.deleteEmployee(this.id);
    this.EmployeeForm.controls["id"].setValue(this.id);
    this.outputEmpList = this.employeeService.createEmployee(this.EmployeeForm.value);
    this.employee = new Employee();
    this.submittedYes = true;
    this.AlertMessage = "You edited successfully!";
    this.getEmpData.emit(this.outputEmpList);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
  }
}
