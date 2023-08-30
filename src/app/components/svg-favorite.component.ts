import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'svg-favorite',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M200-120v-665q0-24 18-42t42-18h290v60H260v574l220-93 220 93v-334h60v425L480-240 200-120zm60-665h290-290zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60z"></path>
        </svg>
    `,
    standalone: true
})

export class SvgFavoriteComponent {}