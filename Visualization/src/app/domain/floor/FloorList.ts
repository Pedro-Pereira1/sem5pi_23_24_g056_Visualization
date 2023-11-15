export interface FloorList {
  floorId: number
  floorNumber: number
  floorDescription: string
  floorMap: {
    passageways: number[]
  }
  floorConnected: string[]
}
