import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModal } from './employee-dash board modal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModalObj: EmployeeModal = new EmployeeModal();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset;
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmpolyeeDetails() {
    this.employeeModalObj.firstName = this.formValue.value.firstName;
    this.employeeModalObj.lastName = this.formValue.value.lastName;
    this.employeeModalObj.email = this.formValue.value.email;
    this.employeeModalObj.mobile = this.formValue.value.mobile;
    this.employeeModalObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModalObj).subscribe(
      (res) => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllEmployee();
        this.formValue.reset;
        alert('Employee Added Successfully');
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModalObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateUserDetails() {
    this.employeeModalObj.firstName = this.formValue.value.firstName;
    this.employeeModalObj.lastName = this.formValue.value.lastName;
    this.employeeModalObj.email = this.formValue.value.email;
    this.employeeModalObj.mobile = this.formValue.value.mobile;
    this.employeeModalObj.salary = this.formValue.value.salary;
    this.api
      .updateUser(this.employeeModalObj, this.employeeModalObj.id)
      .subscribe((res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteUser(row.id).subscribe((res) => {
      alert('Employee Deleted');
      this.getAllEmployee();
    });
  }
}
