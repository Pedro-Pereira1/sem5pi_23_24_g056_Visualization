import { SubOptions, subOptionsBuilding, subOptionsRobot } from "./subOptions"

export interface Options {
    name: string,
    subOptions: SubOptions
}

export const options = [
    {
        name: 'Building Management',
        id: 1,
        subOptions: subOptionsBuilding
    },
    {
        name: 'Robot Management',
        id: 2,
        subOptions: subOptionsRobot
    },
    {
        name: 'Plannign',
        id: 3,
        subOptions: subOptionsRobot
    },
]