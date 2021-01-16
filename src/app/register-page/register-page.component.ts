import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  constructor(
    public auth: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      fullName: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      fullName: this.form.value.fullName,
    };

    this.auth.register(user).subscribe(
      () => {
        this.userService.create({ email: user.email }).subscribe(
          () => {
            this.form.reset();
            this.router.navigate(['']);
            this.submitted = false;
          },
          () => {
            this.submitted = false;
          }
        );
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
