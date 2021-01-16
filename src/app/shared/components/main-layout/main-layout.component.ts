import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit,OnDestroy {
  uSub: Subscription;
  email: any;
  constructor(private router: Router, public auth: AuthService) {}
  ngOnDestroy(): void {
    if(this.uSub){
      this.uSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.uSub = this.auth.getUser().subscribe((data) => {
        this.email = data.users[0].email;
      });
    }
  }

  logout() {
    this.auth.logout();
  }
}
