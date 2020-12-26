import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private subject = new Subject<any>()

  constructor() {
  }

  sendMessage(message: string, type: string){
    this.subject.next({messageAlert: message, typeAlert: type})
    setTimeout(() =>  this.clearMessage() , 2000)
  }

  clearMessage(){
    this.subject.next({})
  }

  getMessage(): Observable<any>{
    return this.subject.asObservable()
  }

}