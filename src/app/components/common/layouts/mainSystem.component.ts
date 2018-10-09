import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {detectBody} from '../../../app.helpers';

declare var jQuery: any;

@Component({
  selector: 'app-main-system',
  templateUrl: 'mainSystem.component.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class MainSystemComponent implements AfterViewInit, OnDestroy {

  ngAfterViewInit() {
    jQuery('body').addClass('top-navigation fixed-sidebar md-skin pace-done');
  }

  ngOnDestroy() {
    jQuery('body').removeClass('top-navigation fixed-sidebar md-skin pace-done');
  }

}
