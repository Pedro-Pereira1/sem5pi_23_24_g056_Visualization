export default interface ElevatorCreate {
    elevatorId: number,
    elevatorBrand: string
    elevatorDescription: string
    elevatorModel: string
    elevatorSerialNumber: string
    buildingCode: string
    floorIds: number[]
}