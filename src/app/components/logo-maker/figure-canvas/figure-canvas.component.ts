import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FigureCanvasService } from '../../../services/figure-canvas.service';

@Component({
  selector: 'app-figure-canvas',
  templateUrl: './figure-canvas.component.html',
  styleUrls: ['./figure-canvas.component.scss']
})
export class FigureCanvasComponent implements OnInit {
  figureColor: string = '#F84F43'

  @Input() logoFigure: string
  @ViewChild('figureCanvas', { static: true })

  figureCanvas: ElementRef<HTMLCanvasElement>
  private ctx: CanvasRenderingContext2D

  constructor(private canvasService: FigureCanvasService) { }

  ngOnInit(): void {
    this.ctx = this.figureCanvas.nativeElement.getContext('2d')
    this.ctx.fillStyle = this.figureColor
    this.grawFigure(this.ctx, this.logoFigure)
  }

  grawFigure(ctx, figure){
    switch (figure) {
      case 'triangle':
        this.canvasService.drawTriangle(ctx, 0, 0, 100, 100)
      break
      case 'square':
        this.canvasService.drawRect(ctx, 0, 0, 100, 100)
      break
      case 'circle':
        this.canvasService.drawCircle(ctx, 50, 50, 50, 0, 2*Math.PI)
      break
    }
  }

}
