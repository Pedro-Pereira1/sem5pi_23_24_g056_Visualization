export interface LoadFloorMap {
    buildingCode: string
    floorId: number
    map: number[][]
    passageways: number[][]
    elevators: number[][]
    rooms: number[][]
}