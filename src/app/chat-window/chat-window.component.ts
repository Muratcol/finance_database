import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers:[ChatService]
})
export class ChatWindowComponent {

  user:String;
  room:String;
  exchangeRates:string;
  stockMarket:string;
  randChannel:string;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  constructor(
    private _chatService:ChatService,
    private el: ElementRef,
    private renderer: Renderer2
    ){
      this._chatService.newUserJoined()
      .subscribe(data=> this.messageArray.push(data));


      this._chatService.userLeftRoom()
      .subscribe(data=>this.messageArray.push(data));

      this._chatService.newMessageReceived()
      .subscribe(data=>this.messageArray.push(data));
  }

  join(){
      this._chatService.joinRoom({user:this.user, room:this.room});
  }

  leave(){
      this._chatService.leaveRoom({user:this.user, room:this.room});
  }

  sendMessage()
  {
      this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
  }

  changeChat(event: any) {
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = this.el.nativeElement.querySelectorAll(".tabContent"); 
    for (i = 0; i < tabcontent.length; i++) {
      this.renderer.setStyle(tabcontent[i], 'display', 'none');
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = this.el.nativeElement.querySelectorAll('.tablinks');
    for (i = 0; i < tablinks.length; i++) {
      this.renderer.removeClass(tablinks[i], 'active');
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    this.renderer.setStyle(this.el.nativeElement.querySelector('#' + (event.target as HTMLTableCellElement).id + 'Tab'), 'display', 'block')
    // document.getElementById(cityName).style.display = "block";
    this.renderer.addClass(event.currentTarget, 'active')
    // evt.currentTarget.className += " active";
  }
  // changeRoom(event: any) {

  // }
}

