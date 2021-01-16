import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { onChangeStatusData, onRemoveData, Task } from '../shared/interfaces';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Output() onRemove = new EventEmitter<onRemoveData>();
  @Output() onChangeStatus = new EventEmitter<onChangeStatusData>();
  @Input() listName: string;
  @Input() tasks: Task[];
  constructor() {}

  ngOnInit(): void {}

  remove(onRemoveData: onRemoveData) {
    this.onRemove.emit(onRemoveData);
  }

  changeStatus(onChangeStatusData: onChangeStatusData) {
    this.onChangeStatus.emit(onChangeStatusData);
  }
}
