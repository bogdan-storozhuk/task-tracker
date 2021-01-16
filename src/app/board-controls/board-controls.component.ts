import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss'],
})
export class BoardControlsComponent implements OnInit {
  constructor( private router: Router) {}

  ngOnInit(): void {}

  createTask() {
    this.router.navigate(['/tasks/new']);
  }
}
