import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../shared/interfaces';
import { TaskService } from '../shared/services/task.service';

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
}
