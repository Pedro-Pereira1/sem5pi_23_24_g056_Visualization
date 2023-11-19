export interface ElevatorEdit {
    elevatorIdentificationNumber: number
    elevatorBrand: string
    elevatorDescription: string
    elevatorModel: string
    elevatorSerialNumber: string
    buildingCode: string
    floorsIdToAdd?: number[]
    floorsIdToRemove?: number[]
}