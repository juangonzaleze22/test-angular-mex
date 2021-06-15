import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/models/employees';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employees;
  panelOpenState: boolean = false;
  formEmployee: FormGroup;
  submitted = false;
  
  items = [];
  pageOfItems: Array<any>;
  displayedColumns: string[] = ['id', 'name', 'last_name', 'birthday'];


  constructor(
    private _global     : GlobalService,
    private fb          : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getDataEmployees();
    this.formEmployee = this.fb.group({
      name           :       ['', Validators.compose([Validators.required,  Validators.maxLength(30)])],
      last_name      :       ['', Validators.compose([Validators.required,  Validators.maxLength(30)])],
      date           :       ['', Validators.compose([Validators.required,  Validators.maxLength(30)])],
    })
  }

  getDataEmployees(){
    this._global.getService("employees").subscribe(response =>{
      if (response['success'] == true){
        this.employees = response['data'].employees;
      }
    })
  }

  //pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.formEmployee.valid) {
      let dataPost = {
        name: this.formEmployee.value.name,
        last_name: this.formEmployee.value.last_name,
        date: this.formEmployee.value.date,
      }
      this._global.postService("employees", dataPost).subscribe( response=>{
        if (response['status'] == 'success'){
          this.getDataEmployees()
        }
      }, err => console.log(err));
      
    }
  }

}
