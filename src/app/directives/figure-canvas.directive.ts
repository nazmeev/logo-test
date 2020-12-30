import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { RoutesLink } from '../shared/enum/routeslink.enum';

@Directive({
	selector: '[figurecanvas]',
})
export class FigureCanvasDirective implements OnInit, OnDestroy {
	private sub: Subscription;

	constructor(
		private elementRef: ElementRef,
		private router: Router,
	) { }

	get host() {
		return this.elementRef.nativeElement;
	}

	ngOnInit() {
		this.sub = fromEvent(this.host, 'click').subscribe(() => {
			this.router.navigate([RoutesLink.logo + '/' + this.host.dataId])
		})
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
}
