import { Component, OnInit } from '@angular/core';
import { ChatioService } from '../services/chatio.service';

@Component({
  selector: 'app-chat-service',
  templateUrl: './chat-service.component.html',
  styleUrls: ['./chat-service.component.css'],

})
export class ChatServiceComponent implements OnInit {

  constructor(
    private chatService:ChatioService
  ) { }

    

  ngOnInit(): void {
    // this.chatService();
  }

}
