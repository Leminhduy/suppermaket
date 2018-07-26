import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {detectBody} from '../../../app.helpers';

declare var jQuery: any;

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.component.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent implements AfterViewInit, OnDestroy {

  ngAfterViewInit() {
    jQuery('body').addClass('fixed-sidebar fixed-nav md-skin pace-done');
  }

  ngOnDestroy() {
    jQuery('body').removeClass('fixed-sidebar fixed-nav md-skin pace-done');
  }

}
