import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private apiUrl = 'https://send-email.mauricio-vereau.workers.dev/';

   http = inject(HttpClient);

  sendMessageWeb(payload: Message){
    return this.http.post(this.apiUrl, payload);
  }
}
