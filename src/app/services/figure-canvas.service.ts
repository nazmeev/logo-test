import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FigureCanvasService {

  constructor() { }
  
  drawRect(context, x, y, width, height) {
    context.rect(x, y, width, height)
    context.fill()
  }
  drawCircle(context, x = 50, y = 50, r = 100, sAngle = 0, eAngle = 2 * Math.PI, counterclockwise = false) {
    context.arc(x, y, r, sAngle, eAngle, counterclockwise)
    context.fill()
  }

  drawTriangle(context, left_padding = 0, top_padding = 0, height = 50, width = 50) {
    context.moveTo(0 + left_padding, 0 + height + top_padding);
    context.lineTo(width / 2 + left_padding, 0 + top_padding);
    context.lineTo(width + left_padding, 0 + height + top_padding);
    context.lineTo(0 + left_padding, 0 + height + top_padding);
    context.fill()
  }
}
