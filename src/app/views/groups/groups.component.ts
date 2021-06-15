import { Component, OnInit } from '@angular/core';
import { Groups } from 'src/app/models/groups';
import { EmployeesByGroup } from 'src/app/models/employees-by-group';

import { GlobalService } from 'src/app/services/global.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Groups[] = [];
  groups_done: Groups[] = [];
  groups_employees: EmployeesByGroup[] = [];
  currentData: Groups[] = [];
  selectEmployees: number;


  selectedAll: any;
  
  constructor(
    private _global     : GlobalService,
  ) { }

  ngOnInit(): void {
    this.getDataGroups();
  }

  async getDataGroups(){
   await this._global.getService("groups").subscribe( response =>{
      if (response['success'] == true){
        this.groups = response['data'].groups;
        this.groups.map( item => {
          item.checked = true
        })
        this.currentData = response['data'].groups;
      }
    }, err => console.log(err));
  }

  drop(event: CdkDragDrop<object[]>) {
    let idx=event.container.data.indexOf(event.previousContainer.data[event.previousIndex]);
    if(idx != -1){
      return;//if item exist
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.selectEmployees = event.previousContainer.data[event.previousIndex]['id'];
      this.groups_done.map( item => {
        item.checked = true;
      })
      this.getEmployeeByGroup(event, this.selectEmployees);
    
    }
  }

  selectCheck(id, event){
    let isChecked = event.checked;
    if (isChecked){
      
    }
  }

  selectAll(){
    for (var i = 0; i < this.groups_done.length; i++) {
      this.groups_done[i].checked = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.groups_done.every(function(item:any) {
      return item.value == true;
    })
  }

  searchGroup(event){
    let word = event.target.value;
      let filter_data = this.currentData.filter((item: Groups) =>{
        return item.name.toLowerCase().includes(word.toLowerCase())
      }
    )
    this.groups = filter_data;
  }

  getEmployeeByGroup(event,id){
    this._global.getGroupById(`employees`, `/getByGroup?id=${this.selectEmployees}`).subscribe( response =>{
      if (response['success'] == true){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        let data = response['data'].employees;
        this.groups_done.forEach(element => {
          if (element.id == id){
            element['employees'] = data;
          }
        });
        this.groups_done['employees'] = data;
      }
    }, err => console.log(err))
  }

  addToArray(item, event){
    if (event.checked){
    }
  }

  sendData(){
    console.log(this.groups_employees)
  }
}
