import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private apiUrl = env.workerUrl;

  http = inject(HttpClient);

  sendMessageWeb(payload: Message) {
    return this.http.post(this.apiUrl, payload);
  }

}
