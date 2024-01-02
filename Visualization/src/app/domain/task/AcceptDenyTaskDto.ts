export interface AcceptDenyTaskDTO {
    taskID: string;
    accept: boolean;
    path?: number[][][];
}