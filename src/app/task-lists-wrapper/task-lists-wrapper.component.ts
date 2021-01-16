import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { onRemoveData, Task, onChangeStatusData } from '../shared/interfaces';
import { TaskService } from '../shared/services/task.service';
import dataTypes from '../shared/dataTypes';
@Component({
  selector: 'app-task-lists-wrapper',
  templateUrl: './task-lists-wrapper.component.html',
  styleUrls: ['./task-lists-wrapper.component.scss'],
})
export class TaskListsWrapperComponent implements OnInit, OnDestroy {
  loading = false;
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  codeReviewTasks: Task[] = [];
  doneTasks: Task[] = [];
  tSub: Subscription;
  constructor(private tasksService: TaskService) {}
  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.tSub = this.tasksService.getAll().subscribe((tasks) => {
      for (let task of tasks) {
        switch (task.status) {
          case 'To do':
            this.toDoTasks.push(task);
            break;
          case 'In progress':
            this.inProgressTasks.push(task);
            break;
          case 'Code review':
            this.codeReviewTasks.push(task);
            break;
          case 'Done':
            this.doneTasks.push(task);
        }
      }
      this.loading = false;
    });
  }
  remove(onRemoveData: onRemoveData) {
    switch (onRemoveData.status) {
      case 'To do':
        this.toDoTasks = this.toDoTasks.filter(
          (task) => task.id !== onRemoveData.id
        );
        break;
      case 'In progress':
        this.inProgressTasks = this.inProgressTasks.filter(
          (task) => task.id !== onRemoveData.id
        );
        break;
      case 'Code review':
        this.codeReviewTasks = this.codeReviewTasks.filter(
          (task) => task.id !== onRemoveData.id
        );
        break;
      case 'Done':
        this.doneTasks = this.doneTasks.filter(
          (task) => task.id !== onRemoveData.id
        );
    }
  }
  changeStatus(onChangeStatusData: onChangeStatusData) {
    let { task, newStatusIndex } = onChangeStatusData;
    const oldStatusIndex = dataTypes.findIndex((elem) => elem === task.status);
    switch (task.status) {
      case 'To do':
        this.toDoTasks = this.toDoTasks.filter((elem) => elem.id !== task.id);
        task.status = dataTypes[newStatusIndex];
        this.inProgressTasks.push(task);
        break;
      case 'In progress':
        this.inProgressTasks = this.inProgressTasks.filter(
          (elem) => elem.id !== task.id
        );
        task.status = dataTypes[newStatusIndex];
        oldStatusIndex < newStatusIndex
          ? this.codeReviewTasks.push(task)
          : this.toDoTasks.push(task);
        break;
      case 'Code review':
        this.codeReviewTasks = this.codeReviewTasks.filter(
          (elem) => elem.id !== task.id
        );
        task.status = dataTypes[newStatusIndex];
        oldStatusIndex < newStatusIndex
          ? this.doneTasks.push(task)
          : this.inProgressTasks.push(task);
        break;
      case 'Done':
        this.doneTasks = this.doneTasks.filter((elem) => elem.id !== task.id);
        task.status = dataTypes[newStatusIndex];
        this.codeReviewTasks.push(task);
        break;
    }
  }
}
