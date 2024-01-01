import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import Orientation from "./orientation.js"
import ThumbRaiser from "./thumb_raiser.js"
import { ActivatedRoute } from '@angular/router';
import * as TWEEN from '@tweenjs/tween.js';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { PassagewayService } from '../services/passageway.service';
import { Building } from '../domain/building/Building';
import { Floor } from '../domain/floor/Floor';
import { FloorMapRender } from '../domain/floor/FloorMapRender.js';
import { RobotModel } from '../domain/robotModel/RobotModel.js';
import { initial } from 'cypress/types/lodash/index.js';
import { ElevatorService } from '../services/elevator.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-view3d',
	templateUrl: './view3d.component.html',
	styleUrls: ['./view3d.component.css'],
	providers: [BuildingService, FloorService, PassagewayService, AuthServiceService]
})
export class View3dComponent implements OnDestroy {

	@ViewChild('myCanvas') private canvasRef!: ElementRef;
	thumbRaiser!: ThumbRaiser;
	private animationId: number | null = null;

	constructor(
		private buildingService: BuildingService,
		private floorService: FloorService,
		private passagewayService: PassagewayService,
		private elevatorService: ElevatorService,
		private authService: AuthServiceService,
		private router: Router
	) { }

	buildings: Building[] = [];
	buildingCode: string = "";
	floors: Floor[] = []
	floorId: number = 0;
	currentFloor: number = 0;
	elevatorID: number = 0;

	initialPosition: [number, number] = [0, 0];

	modelName: string = "";
	modelFile: File | null = null;

	ngOnInit(): void {
		const role = this.authService.getRoleByToken(this.authService.getToken());
		if(role == "CampusManager" || role == "FleetManager" || role == "TaskManager"){
			this.listBuildings();
		}else{
			window.alert("You don't have permission to access this page");
			this.router.navigate(['/home']);
			return;	
		}
		
	}

	renderCanvas() {
		const theFloor = this.floors.find((floor: Floor) => floor.floorId == this.floorId);
		const theModel = this.modelFile

		if (theFloor?.floorMap.map.length! > 0) {
			if (this.modelFile == null) {
				console.log("No model file found, using default model");
				this.defaultModel(theFloor!);
			} else {
				this.initialize(theFloor!, theModel!,0,0);
				this.animate = this.animate.bind(this);
				this.animate();
			}
		} else {
			alert("No floor map found");
		}
	}

	defaultModel(theFloor: Floor) {
		fetch("../../assets/View3D/models/gltf/RobotExpressive/robot1.glb")
		.then(res => res.blob())
		.then(blob => {
			const file: File = new File([blob], "robot1.glb");
			this.modelFile = file;
			this.initialize(theFloor!, file,1,14);
			this.animate = this.animate.bind(this);
			this.animate();
		})
	}

	updateFloorFile(floor: Floor, initialPositionX: Number, initialPositionY: Number): FloorMapRender {
		if(initialPositionX == null || initialPositionY == null){
			initialPositionX = 0;
			initialPositionY = 0;
		}

		if (this.thumbRaiser != undefined && this.thumbRaiser.userInterface != undefined) {
			this.thumbRaiser.userInterface.gui.destroy();
		}
		return {
			map: floor.floorMap.map,
			initialPosition: [initialPositionX, initialPositionY],
			initialDirection: 0.0,
			exitLocation: [10, 10],
			groundTextureUrl: "./../../assets/View3D/textures/ground.jpg",
			wallTextureUrl: "./../../assets/View3D/textures/wall.jpg",
			elevatorTextureUrl: "./../../assets/View3D/textures/wall.jpg",
			doorTextureUrl: "./../../assets/View3D/door_textures/door_original.jpg",
			size: {
				width: floor.floorMap.map[0].length - 1,
				height: floor.floorMap.map.length - 1
			}
		} as FloorMapRender
	}

	uploadModel(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.modelName = file.name
			if (this.animationId) {
				cancelAnimationFrame(this.animationId);
			}
			this.modelFile = file
			this.renderCanvas()
		}
	}

	prepareModel(robotModel: File): RobotModel {
		return {
			model: robotModel,
			eyeHeight: 0.8,
			scale: new  THREE.Vector3(0.1, 0.1, 0.1),
			walkingSpeed: 0.75,
			initialDirection: 0.0,
			turningSpeed: 75.0,
			runningFactor: 2.0,
			keyCodes: { fixedView: "Digit1", firstPersonView: "Digit2", thirdPersonView: "Digit3", topView: "Digit4", viewMode: "KeyV", userInterface: "KeyU", miniMap: "KeyM", help: "KeyH", statistics: "KeyS", run: "KeyR", left: "ArrowLeft", right: "ArrowRight", backward: "ArrowDown", forward: "ArrowUp", jump: "KeyJ", yes: "KeyY", no: "KeyN", wave: "KeyW", punch: "KeyP", thumbsUp: "KeyT" }
		} as RobotModel
	}

	initialize(floor: Floor, modelFile: File,initialPositionX: Number, initialPositionY: Number) {
		// Create the game
		this.currentFloor = floor.floorNumber;
		this.thumbRaiser = new ThumbRaiser(
			{buildingCode: this.buildingCode, floorId: this.floorId, floor: floor},
			this.passagewayService,
			this.elevatorService,
			this.canvas, // Canvas
			{}, // General Parameters
			{ scale: new THREE.Vector3(1.0, 0.5, 1.0), mazeData: this.updateFloorFile(floor,initialPositionX,initialPositionY), elevatorDoorData: floor.floorMap.elevatorsCoords }, // Maze parameters
			{ model: this.prepareModel(modelFile) }, // Player parameters
			{ ambientLight: { intensity: 0.1 }, pointLight1: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(-3.5, 10.0, 2.5) }, pointLight2: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(3.5, 10.0, -2.5) } }, // Lights parameters
			{}, // Fog parameters
			{ view: "fixed", multipleViewsViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5) }, // Fixed view camera parameters
			{ view: "first-person", multipleViewsViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -10.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // First-person view camera parameters
			{ view: "third-person", multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -20.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // Third-person view camera parameters
			{ view: "top", multipleViewsViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0 }, // Top view camera parameters
			{ view: "mini-map", multipleViewsViewport: new THREE.Vector4(0.99, 0.02, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.64 }, // Mini-msp view camera parameters
			false,
			this.path,
			this.floors,
			this.pathFloors
		);
	}

	animate(): void {
		this.animationId = requestAnimationFrame(this.animate.bind(this));
		TWEEN.update();
		// Update the game
		this.thumbRaiser.update();
	}

	private get canvas(): HTMLCanvasElement {
		return this.canvasRef.nativeElement;
	}

	ngOnDestroy(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
		}
		this.canvas.parentElement?.removeChild(this.canvas);
		if (this.thumbRaiser.userInterface) {
			this.thumbRaiser.userInterface.gui.destroy();
		}
	}

	listBuildings() {
		this.buildingService.listAll().subscribe((buildings: Building[]) => {
			this.buildings = buildings
		})
	}

	listFloors(buildingCode: string) {
		this.floorService.listAllFloors(buildingCode).subscribe((floors: Floor[]) => {
			this.floors = floors;
		})
	}

	@HostListener('window:newFloorMap', ['$event'])
	onNewFloorMap(event: CustomEvent) {
		let building = this.findBuildingCode(event.detail.floor) as Building;
		if(building.buildingCode != this.buildingCode){
			this.buildingCode = building.buildingCode as string;
			this.listFloors(this.buildingCode);
		}
		
		this.floorId = event.detail.floor.floorId;
		this.initialize(event.detail.floor,this.modelFile!,event.detail.initialPosition[0],event.detail.initialPosition[1]);
		this.animate = this.animate.bind(this);
		this.animate();
	}

	@HostListener('window:clickElevatorButton', ['$event'])
	onClickElevatorButton(event: CustomEvent) {
		this.elevatorID = event.detail.elevatorID;
	}

	clickElevatorButton(floor: Floor) {
		if(floor.floorNumber != this.currentFloor){
			console.log(`Button ${floor.floorNumber} was clicked. -> ${floor.floorId}`);
			this.currentFloor = floor.floorNumber;
			this.thumbRaiser.useElevator(this.elevatorID, floor);
		}else{
			window.alert("You are already on this floor");
		}
	}

	findBuildingCode(floor: Floor) {
		for(let building of this.buildings){
			if(building.buildingFloors.includes(floor.floorId)){
				return building;
			}
		}
		return null;
	}
	
	//path = [
	//	[					// floor 0
	//		//[0,0],
	//		//[2,2]
	//		[2,14],
	//		[3,15],
	//		[2,16],
	//		[2,17],
	//		[2,18],
	//		[1,18],
	//		[0,18],
	//	],
	//	[
	//		[1,18],
	//		[2,17],
	//		[3,18],
	//		[4,19],
	//	]
	//]

	pathFloors = [
		1,
		2
	]

	path = [
		[					// floor 1
			[3,0],
			[3,18],
			[4,18],
			[4,19],
		],
		[
			[5, 1],
			[6, 1],
			[6, 4],
		]
	]

	//[
    //            14,
    //            1
    //        ],
    //        [
    //            14,
    //            2
    //        ],
    //        [
    //            15,
    //            3
    //        ],
    //        [
    //            16,
    //            2
    //        ],
    //        [
    //            17,
    //            2
    //        ],
    //        [
    //            18,
    //            1
    //        ],
    //        [
    //            18,
    //            0
    //        ]
    //    ],
    //    [
    //        [
    //            18,
    //            0
    //        ],
    //        [
    //            18,
    //            1
    //        ],
    //        [
    //            17,
    //            2
    //        ],
    //        [
    //            18,
    //            3
    //        ],
    //        [
    //            19,
    //            4
    //        ]
    //    ],
    //    [
    //        [
    //            0,
	//          5
	//      ],
	//      [
	//          1,
	//          5
	//      ],
	//      [
	//          1,
	//          4
	//      ]
	//  ]

}