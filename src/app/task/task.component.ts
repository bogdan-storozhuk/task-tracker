import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../shared/interfaces';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  remove(id: string){
    this.taskService.remove(id).subscribe(()=>{

    })
  }
}
