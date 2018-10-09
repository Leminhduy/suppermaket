import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/ChatService.services';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message;
  txtMember;
  arrUser = [];

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe((success) => {
      console.log('success', success);
    });
    this.chatService.shareDataSocketio('online').subscribe((success) => {
      this.arrUser = success;
    });
    this.chatService.shareDataSocketio('message').subscribe((success) => {
      this.message = success;
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  createMember() {
    this.chatService.insertMember(this.txtMember);
    this.txtMember = '';
  }

}
