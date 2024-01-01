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
        permission: ['CampusManager'],
        items: [
            {
                routerLink: 'buildings/createBuilding',
                label: 'Create Building'
            },
            {
                routerLink: 'buildings/editBuilding',
                label: 'Edit Building'
            },
            {
                routerLink: 'buildings/listAllBuildings',
                label: 'List All Buildings'
            },
            {
                routerLink: 'buildings/listBuildingsMaxMinFloors',
                label: 'List Buildings by Max Min Floors'
            }
        ]
    },
    {
        routerLink: 'floors',
        icon: 'fal fa-map',
        label: 'Floors',
        permission: ['CampusManager'],
        items: [
            {
                routerLink: 'floors/createFloor',
                label: 'Create Floor'
            },
            {
                routerLink: 'floors/editFloor',
                label: 'Edit Floor'
            },
            {
                routerLink: 'floors/listAllFloorsOfBuilding',
                label: 'List All Floors of Building'
            },
            {
                routerLink: 'floors/listFloorsPassageways',
                label: 'List Floors Passageways'
            },
            {
                routerLink: 'floors/loadFloorMap',
                label: 'Load Floor Map'
            }
        ]
    },
    {
        routerLink: 'passageways',
        icon: 'fal fa-road',
        label: 'Passageways',
        permission: ['CampusManager'],
        items: [
            {
                routerLink: 'passageways/createPassageway',
                label: 'Create Passageway'
            },
            {
                routerLink: 'passageways/editPassageway',
                label: 'Edit Passageway'
            },
            {
                routerLink: 'passageways/list',
                label: 'List Passageways'
            }
        ]
    },
    {
        routerLink: 'elevators',
        icon: 'fal fa-sort-numeric-up-alt',
        label: 'Elevators',
        permission: ['CampusManager'],
        items: [
            {
                routerLink: 'elevators/create',
                label: 'Create Elevator'
            },
            {
                routerLink: 'elevators/edit',
                label: 'Edit Elevator'
            },
            {
                routerLink: 'elevators/listInBuilding',
                label: 'List Elevators'
            }
        ]
    },
    {
        routerLink: 'rooms',
        icon: 'fal fa-door-closed',
        label: 'Rooms',
        permission: ['CampusManager'],
        items: [
            {
                routerLink: 'rooms/createRoom',
                label: 'Create Room'
            }
        ]

    },
    {
        routerLink: 'robot-types',
        icon: 'fal fa-wrench',
        label: 'Robot Types',
        permission: ['FleetManager'],
        items: [
            {
                routerLink: 'robot-types/createRobotType',
                label: 'Create Robot Type'
            }
        ]
    },
    {
        routerLink: 'robots',
        icon: 'fal fa-robot',
        label: 'Robots',
        permission: ['FleetManager'],
        items: [
            {
                routerLink: 'robots/createRobot',
                label: 'Create Robot'
            },
            {
                routerLink: 'robots/inhibitRobot',
                label: 'Inhibit Robot'
            },
            {
                routerLink: 'robots/listAll',
                label: 'List All Robots'
            }
        ]
    },
    {
        routerLink: 'view3d',
        icon: 'fal fa-cubes',
        label: '3D View',
        permission: ['FleetManager', 'CampusManager', 'TaskManager']
    },
    {
        routerLink: 'shortest-path',
        icon: 'fal fa-ruler',
        label: 'Shortest Path'
    },
    {
        routerLink: 'backoffice-user',
        icon: 'fal fa-user',
        label: 'Backoffice Users',
        permission: ['Admin']
    },
    {
        routerLink: 'tasks-backoffice',
        icon: 'fal fa-tasks',
        label: 'Tasks',
        permission: ['TaskManager'],
        items: [
            {
                routerLink: 'tasks-backoffice/requestApproval',
                label: 'Request Approval'
            },
            {
                routerLink: 'tasks-backoffice/list/notApproved',
                label: 'List Pending'
            },
            {
                routerLink: 'tasks-backoffice/list/requests',
                label: 'Search Requests'
            },
            {
                routerLink: 'tasks-backoffice/list/approved',
                label: 'List Approved'
            }
        ]
    },
    {
        routerLink: 'user-data',
        icon: 'fal fa-user',
        label: 'User Data'
    },
    {
        routerLink: 'tasks-users',
        icon: 'fal fa-tasks',
        label: 'Request Task',
        permission: ['Utente']
    }
];
