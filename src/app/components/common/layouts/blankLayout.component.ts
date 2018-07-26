import {Component} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'blank',
    templateUrl: 'blankLayout.component.html'
})
export class BlankLayoutComponent {

    ngAfterViewInit() {
        jQuery('body').addClass('gray-bg');
    }

    ngOnDestroy() {
        jQuery('body').removeClass('gray-bg');
    }
}
