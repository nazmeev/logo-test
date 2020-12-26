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

  logos: Logo[]

  constructor(
    private dbService: DbService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { data: string, type: string }
    if(state) this.messagesService.sendMessage(state.data, state.type)
  }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.dbService.getAllData().subscribe(
      data => {
        this.logos = data
      }
    )

  }

}
