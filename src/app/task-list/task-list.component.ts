import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../shared/interfaces';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() listName: string;
  @Input() tasks: Task[];
  constructor() {}

  ngOnInit(): void {}
}
