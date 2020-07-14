import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  Input,
  ContentChild,
  HostListener,
} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [ChatService],
})
export class ChatWindowComponent {
  user: String;
  room: String;
  faPowerOff = faPowerOff;
  exchangeRates: string;
  stockMarket: string;
  randChannel: string;
  messageText: String;
  chatDummyContent: String;
  chatContent: String;
  isLoggedIn: string;
  status: boolean = false;
  messageArray: Array<{ user: String; message: String }> = [];
  @ViewChild('defaultSelection')
  defaulSelection: ElementRef;
  ngAfterViewInit() {
    this.defaulSelection.nativeElement.click();
    this.isLoggedIn = localStorage.getItem('name');
  }
  constructor(
    private _chatService: ChatService,
    private el: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) {

    this._chatService
      .newUserJoined()
      .subscribe((data) => this.messageArray.push(data));

    this._chatService
      .userLeftRoom()
      .subscribe((data) => this.messageArray.push(data));

    this._chatService
      .newMessageReceived()
      .subscribe((data) => this.messageArray.push(data));
  }
  @HostListener('document:click', ['$event'])
clickOut(event) {
    let modal = this.el.nativeElement.querySelector('#myModal');
    if (event.target == modal) {
      this.renderer.setStyle(modal, 'display', 'none');
  };
}
  
  chatToggle() {
    this.status = !this.status;
  }
  join() {
    this._chatService.joinRoom({ user: this.user, room: this.room });
    if (this.room == 'exchangeRatesRoom') {
      this.chatContent = this.el.nativeElement.querySelector(
        '.firstChatContent'
      );
      this.chatDummyContent = this.el.nativeElement.querySelector(
        '.chatOffContentForex'
      );
      this.renderer.setStyle(this.chatDummyContent, 'display', 'none');
      this.renderer.setStyle(this.chatContent, 'display', 'block');
    } else if (this.room == 'stockMarketRoom') {
      this.chatDummyContent = this.el.nativeElement.querySelector(
        '.chatOffContentStock'
      );
      this.chatContent = this.el.nativeElement.querySelector(
        '.secondChatContent'
      );
      this.renderer.setStyle(this.chatDummyContent, 'display', 'none');
      this.renderer.setStyle(this.chatContent, 'display', 'block');
    } else if (this.room == 'randChannelRoom') {
      this.chatDummyContent = this.el.nativeElement.querySelector(
        '.chatOffContentRand'
      );
      this.chatContent = this.el.nativeElement.querySelector(
        '.thirdChatContent'
      );
      this.renderer.setStyle(this.chatDummyContent, 'display', 'none');
      this.renderer.setStyle(this.chatContent, 'display', 'block');
    }
  }

  leave() {
    this._chatService.leaveRoom({ user: this.user, room: this.room });
    if (this.room == 'exchangeRatesRoom') {
      this.chatDummyContent = this.el.nativeElement.querySelector(
        '.chatOffContentForex'
      );
      this.chatContent = this.el.nativeElement.querySelector(
        '.firstChatContent'
      );
      this.renderer.setStyle(this.chatDummyContent, 'display', 'block');
      this.renderer.setStyle(this.chatContent, 'display', 'none');
    } else if (this.room == 'stockMarketRoom') {
      this.chatDummyContent = this.el.nativeElement.querySelector(
        '.chatOffContentStock'
      );
      this.chatContent = this.el.nativeElement.querySelector(
        '.secondChatContent'
      );
      this.renderer.setStyle(this.chatDummyContent, 'display', 'block');
      this.renderer.setStyle(this.chatContent, 'display', 'none');
    } else if (this.room == 'randChannelRoom') {
      this.chatDummyContent = this.el.nativeElement.querySelector(
        '.chatOffContentRand'
      );
      this.chatContent = this.el.nativeElement.querySelector(
        '.thirdChatContent'
      );
      this.renderer.setStyle(this.chatDummyContent, 'display', 'block');
      this.renderer.setStyle(this.chatContent, 'display', 'none');
    }
  }

  sendMessage() {
    if (!this.userService.isLoggedIn) {
      let modal = this.el.nativeElement.querySelector('#myModal');
      this.renderer.setStyle(modal, 'display', 'block');
    }
    this._chatService.sendMessage({
      user: this.user,
      room: this.room,
      message: this.messageText,
    });
  }
  closePopup() {
    let modal = this.el.nativeElement.querySelector('#myModal');
    this.renderer.setStyle(modal, 'display', 'none');
  }
  changeChat(event: any) {
    var i, tabcontent, tablinks;

    tabcontent = this.el.nativeElement.querySelectorAll('.tabContent');
    for (i = 0; i < tabcontent.length; i++) {
      this.renderer.setStyle(tabcontent[i], 'display', 'none');
    }
    tablinks = this.el.nativeElement.querySelectorAll('.tablinks');
    for (i = 0; i < tablinks.length; i++) {
      this.renderer.removeClass(tablinks[i], 'active');
    }
    this.renderer.setStyle(
      this.el.nativeElement.querySelector(
        '#' + (event.target as HTMLTableCellElement).id + 'Tab'
      ),
      'display',
      'block'
    );
    this.renderer.addClass(event.currentTarget, 'active');
  }
  changeRoom(event: any) {
    let roomName = (event.target as HTMLTableCellElement).id;
    if (roomName == 'exchangeRates') {
      this.room = 'exchangeRatesRoom';
      this.user = localStorage.getItem('name');
      this.changeChat(event);
      return;
    } else if (roomName == 'stockMarket') {
      this.room = 'stockMarketRoom';
      this.changeChat(event);
      return;
    } else {
      this.room = 'randChannelRoom';
      this.changeChat(event);
    }
  }
}
