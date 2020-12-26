import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FigureCanvasService } from '../../../services/figure-canvas.service';

@Component({
  selector: 'app-figure-canvas',
  templateUrl: './figure-canvas.component.html',
  styleUrls: ['./figure-canvas.component.scss']
})
export class FigureCanvasComponent implements OnInit {

  @Input() logo: string
  @ViewChild('figureCanvas', { static: true })

  figureCanvas: ElementRef<HTMLCanvasElement>
  private ctx: CanvasRenderingContext2D

  constructor(private canvasService: FigureCanvasService) { }

  ngOnInit(): void {
    this.ctx = this.figureCanvas.nativeElement.getContext('2d')
    this.ctx.fillStyle = '#F84F43'
    switch (this.logo) {
      case 'triangle':
        this.canvasService.drawTriangle(this.ctx, 0, 0, 100, 100)
      break;
      case 'square':
        this.canvasService.drawRect(this.ctx, 0, 0, 100, 100)
      break;
      case 'circle':
        this.canvasService.drawCircle(this.ctx, 75, 75, 50, 0, 2*Math.PI, false)
      break;
    }
  }

}
