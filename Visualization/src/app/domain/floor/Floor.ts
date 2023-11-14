export interface Floor {
    floorId: number
    floorNumber: number
    floorDescription: string
    floorMap: {
        map: number[][],
        passageways: number[],
        rooms: string[],
        elevators: number[],
        passagewaysCoords: number[][],
        elevatorsCoords: number[][],
        roomCoords: number[][]
    }
}