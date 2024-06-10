import { Directive, ElementRef, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({ selector: '[button-visibility]' })
export class ButtonVisibilityDirective implements OnInit {
  event$: Subscription;
  constructor(private el: ElementRef, private router: Router) {
    this.event$ = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/converter') {
          this.el.nativeElement.style.display = 'none';
        } else {
          this.el.nativeElement.style.display = 'block';
        }
      }
    });
  }

  ngOnInit() {}
}
