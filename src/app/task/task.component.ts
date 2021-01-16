import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { onRemoveData, Task, onChangeStatusData } from '../shared/interfaces';
import { TaskService } from '../shared/services/task.service';
import dataTypes from '../shared/dataTypes';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Output() onRemove = new EventEmitter<onRemoveData>();
  @Output() onChangeStatus = new EventEmitter<onChangeStatusData>();
  dSub: Subscription;
  csSub: Subscription;
  constructor(private taskService: TaskService, private router: Router) {}
  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.csSub) {
      this.csSub.unsubscribe();
    }
  }

  ngOnInit(): void {}

  remove(onRemoveData: onRemoveData) {
    this.dSub = this.taskService.remove(onRemoveData.id).subscribe(() => {
      this.onRemove.emit(onRemoveData);
    });
  }

  openEdit() {
    this.router.navigate(['/tasks', this.task.id]);
  }

  changeStatusNext(task: Task) {
    const newStatusIndex =dataTypes.findIndex((elem)=>elem===task.status)+1;
    if(!dataTypes[newStatusIndex]){
      return;
    }
    const patchedTask = {...task,status: dataTypes[newStatusIndex]};
    this.csSub = this.taskService.changeStatus(patchedTask).subscribe(() => {
      this.onChangeStatus.emit({task,newStatusIndex});
    });
  }

  changeStatusPrev(task: Task) {
    const newStatusIndex =dataTypes.findIndex((elem)=>elem===task.status)-1;
    if(!dataTypes[newStatusIndex]){
      return;
    }
    const patchedTask = {...task,status: dataTypes[newStatusIndex]};
    this.csSub = this.taskService.changeStatus(patchedTask).subscribe(() => {
      this.onChangeStatus.emit({task,newStatusIndex});
    });
  }
}
