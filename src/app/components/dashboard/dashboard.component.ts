import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];
  addTaskValue : string = '';
  editedTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editedTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTasks().subscribe(
      res => {this.taskArr = res;},
      err=>alert('Unable to get list of tasks')   
    );
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    },err => {
      alert(err);
    })
  }

  editTask(){
    this.taskObj.task_name = this.editedTaskValue; // updating the existing task with new description
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    },err=>alert("Failed to update task"));
  }

  deleteTask(TaskToDelete : Task){
    this.crudService.deleteTask(TaskToDelete).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert("Failed to delete")
    })
  }

  getTaskTobeEdited(taskToEdit : Task){
    this.taskObj = taskToEdit; // passing existing task before editing to the edit function
    this.editedTaskValue = taskToEdit.task_name;  // This will display the current task in the input box
  }

}
