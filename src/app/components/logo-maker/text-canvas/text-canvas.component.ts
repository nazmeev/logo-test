import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FontsLink } from '../../../shared/enum/fontslink.enum';


@Component({
  selector: 'app-text-canvas',
  templateUrl: './text-canvas.component.html'
})

export class TextCanvasComponent implements OnInit {
  public link:string

  @Input() logoFont: string
  @Input() logoText: string

  constructor(
    private sanitizer: DomSanitizer
  ) {  }
  
  ngOnInit(): void {
    this.link = FontsLink[this.logoFont]
  }

  getFontCSS() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link)
  }
}
