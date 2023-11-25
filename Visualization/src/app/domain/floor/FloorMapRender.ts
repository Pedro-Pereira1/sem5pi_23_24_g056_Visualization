export interface FloorMapRender {
    groundTextureUrl: string
    wallTextureUrl: string
    elevatorTextureUrl: string
    doorTextureUrl: string
    size: {
        width: number
        height: number
    }
    map: number[][]
    initialPosition: number[]
    initialDirection: number
    exitLocation: number[]
}