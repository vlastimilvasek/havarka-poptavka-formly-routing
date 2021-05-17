// import the required animation functions from the angular animations module
import { trigger, state, group, query, animate, transition, style } from '@angular/animations';

export const slideRightLeftAnimation = trigger('slideRightLeftAnimation', [
    transition(':increment', slideLeft()),
    transition(':decrement', slideRight())      // slideTo('left')
]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    top: 0,
                    [direction]: 0,
                    width: '100%'
                })
            ],
            optional
        ),
        query(':enter', [style({ [direction]: '-100%' })]),
        group([
            query(
                ':leave',
                [animate('600ms ease', style({ [direction]: '100%' }))],
                optional
            ),
            query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))])
        ])
    ];
}

function slideRight() {
    const optional = { optional: true };
    return [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), optional),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
            ], { optional: true }),
        ])
    ];
}

function slideLeft() {
    const optional = { optional: true };
    return [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ])
    ];
}