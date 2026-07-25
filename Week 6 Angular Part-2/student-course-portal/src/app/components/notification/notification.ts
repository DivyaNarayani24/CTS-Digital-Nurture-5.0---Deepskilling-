import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, FormsModule],
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  newMessage = '';

  constructor(private notificationService: NotificationService) {}

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  addMessage(): void {
    if (this.newMessage.trim()) {
      this.notificationService.addMessage(this.newMessage.trim());
      this.newMessage = '';
    }
  }

  clearMessages(): void {
    this.notificationService.clearMessages();
  }
}