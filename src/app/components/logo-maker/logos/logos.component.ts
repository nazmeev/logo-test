import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logo } from '../../../interfaces/logo.interface';
import { DbService } from '../../../services/db.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html'
})
export class LogosComponent implements OnInit {
  loaded: boolean = false
  logos: Logo[]

  constructor(
    private dbService: DbService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.initAlert()
  }

  ngOnInit(): void {
    this.loadList()
  }

  loadList(){
    this.dbService.getAllData('logos').subscribe(
      data => {
        this.logos = data
        this.loaded = true
      }
    )
  }

  initAlert(){
    const state = this.router.getCurrentNavigation().extras.state as { data: string, type: string }
    if(state) this.messagesService.sendMessage(state.data, state.type)
  }

}
