import { Component, OnInit } from '@angular/core';
import { faLaptop, faMailBulk, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert-center',
  templateUrl: './alert-center.component.html',
  styleUrls: ['./alert-center.component.css']
})
export class AlertCenterComponent implements OnInit {
  faLaptop = faLaptop;
  faMail = faMailBulk;
  faTrash = faTrash;
  faPen = faPen;
  constructor() { }

  ngOnInit(): void {
  }

}
