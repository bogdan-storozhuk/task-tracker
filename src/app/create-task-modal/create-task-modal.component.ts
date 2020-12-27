import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../shared/interfaces';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent implements OnInit {
  form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private tasksService: TaskService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      storyPoints: new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null, [Validators.required]),
      assignedTo: new FormControl(null, [Validators.required]),
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    const task: Task = {
      ...this.form.value,
      status: 'To do',
      date: new Date(),
    };

    this.tasksService.create(task).subscribe(() => {
      this.form.reset();
    });
  }
}
