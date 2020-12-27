import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss'],
})
export class BoardControlsComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  createTask() {
    const modalRef = this.modalService.open(CreateTaskModalComponent);
  }
}
