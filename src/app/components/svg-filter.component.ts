import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'svg-filter',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M440-160q-17 0-28.5-11.5T400-200v-240L161-745q-14-17-4-36t31-19h584q21 0 31 19t-4 36L560-440v240q0 17-11.5 28.5T520-160h-80zm40-276l240-304H240l240 304zm0 0z"></path>
        </svg>
    `,
    standalone: true
})

export class SvgFilterComponent {}