import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routerLink: 'home',
        icon: 'fal fa-home',
        label: 'Home'
    },
    {
        routerLink: 'buildings',
        icon: 'fal fa-building',
        label: 'Buildings',
        items: [
        {
            routerLink: 'buildings/createBuilding',
            label: 'Create Building'
        },
        {
            routerLink: 'buildings/editBuilding',
            label: 'Edit Building'
        }
        ]
    },
    {
        routerLink: 'floors',
        icon: 'fal fa-map',
        label: 'Floors'
    },
    {
        routerLink: 'passageways',
        icon: 'fal fa-road',
        label: 'Passageways'
    },
    {
        routerLink: 'elevators',
        icon: 'fal fa-sort-numeric-up-alt',
        label: 'Elevatrors'
    },
    {
        routerLink: 'robot-types',
        icon: 'fal fa-wrench',
        label: 'Robot Types',
    },
    {
        routerLink: 'robots',
        icon: 'fal fa-robot',
        label: 'Robots'
    },
];