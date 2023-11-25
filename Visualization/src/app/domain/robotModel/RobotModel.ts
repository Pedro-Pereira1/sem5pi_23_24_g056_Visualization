export interface RobotModel {
    model: File
    eyeHeight: number
    scale: THREE.Vector3
    walkingSpeed: number
    initialDirection: number
    turningSpeed: number
    runningFactor: number
    keyCodes: {
        fixedView: string,
        firstPersonView: string,
        thirdPersonView: string,
        topView: string,
        viewMode: string,
        userInterface: string,
        miniMap: string,
        help: string,
        statistics: string,
        run: string,
        left: string,
        right: string,
        backward: string,
        forward: string,
        jump: string,
        yes: string,
        no: string,
        wave: string,
        punch: string,
        thumbsUp: string,
    }
}