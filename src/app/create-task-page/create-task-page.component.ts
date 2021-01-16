import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, UserDisplayData } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { TaskService } from '../shared/services/task.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss'],
})
export class CreateTaskPageComponent implements OnInit, OnDestroy {
  task: Task;
  form: FormGroup;
  formName = 'New Task';
  buttonText = 'Create Task';
  submitted = false;
  email: string;
  usersData: UserDisplayData[];

  tSub: Subscription;
  cSub: Subscription;
  uSub: Subscription;
  udSub: Subscription;

  constructor(
    private tasksService: TaskService,
    private usersService: UserService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if(this.uSub){
      this.uSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.udSub = this.usersService.getAll().subscribe((users) => {
      this.usersData = users;
      console.log(this.usersData);
    });
    this.uSub = this.auth.getUser().subscribe((data) => {
      this.email = data.users[0].email;
    });
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.tasksService.getById(params.id).subscribe((task) => {
          this.task = task;
          this.formName = 'Edit Task';
          this.buttonText = 'Update Task';
          this.form = new FormGroup({
            name: new FormControl(this.task.name, [Validators.required]),
            description: new FormControl(this.task.description, [
              Validators.required,
            ]),
            storyPoints: new FormControl(this.task.storyPoints, [
              Validators.required,
            ]),
            assignedTo: new FormControl(this.task.assignedTo, [Validators.required]),
          });
        });
      } else {
        this.form = new FormGroup({
          name: new FormControl(null, [Validators.required]),
          description: new FormControl(null, [Validators.required]),
          storyPoints: new FormControl(null, [Validators.required]),
          assignedTo: new FormControl(null, [Validators.required]),
        });
      }
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    let task: Task;
    console.log(this.form.value);

    if (this.task) {
      task = { ...this.form.value, id: this.task.id, status: this.task.status, createdBy: this.email };
      this.tSub = this.tasksService.update(task).subscribe(() => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['']);
      });
    } else {
      task = {
        ...this.form.value,
        status: 'To do',
        date: new Date(),
        createdBy: this.email
      };
      this.cSub = this.tasksService.create(task).subscribe(() => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['']);
      });
    }
  }
}
