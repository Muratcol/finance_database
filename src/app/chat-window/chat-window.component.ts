import { Component, ElementRef, Renderer2, ViewChild, Input, ContentChild } from '@angular/core';
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
  @ViewChild ('defaultSelection')
  defaulSelection : ElementRef
  ngAfterViewInit() {
  this.defaulSelection.nativeElement.click()
    
  }
  constructor(
    private _chatService:ChatService,
    private el: ElementRef,
    private renderer: Renderer2
    ){
      // this.defaulSelection.nativeElement.click()


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
  
    tabcontent = this.el.nativeElement.querySelectorAll(".tabContent"); 
    for (i = 0; i < tabcontent.length; i++) {
      this.renderer.setStyle(tabcontent[i], 'display', 'none');
    }
    tablinks = this.el.nativeElement.querySelectorAll('.tablinks');
    for (i = 0; i < tablinks.length; i++) {
      this.renderer.removeClass(tablinks[i], 'active');
    }
    this.renderer.setStyle(this.el.nativeElement.querySelector('#' + (event.target as HTMLTableCellElement).id + 'Tab'), 'display', 'block')
    this.renderer.addClass(event.currentTarget, 'active')
  }
  changeRoom(event: any) {
    let roomName = (event.target as HTMLTableCellElement).id
    if ( roomName == 'exchangeRates') {
      this.room = 'exchangeRatesRoom'
      this.user = localStorage.getItem('name')
      this.changeChat(event)
      return
    }
    else if ( roomName == 'stockMarket') {
      this.room = 'stockMarketRoom'
      this.changeChat(event)
      return
    }
    else {
      this.room = 'randChannelRoom'
      this.changeChat(event)
    } 
}
}

