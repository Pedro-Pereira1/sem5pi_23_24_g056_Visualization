import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import Orientation from "./orientation.js"
import ThumbRaiser from "./thumb_raiser.js"
import { ActivatedRoute } from '@angular/router';

import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { Building } from '../domain/building/Building';
import { Floor } from '../domain/floor/Floor';
@Component({
  selector: 'app-view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.css'],
  providers: [BuildingService, FloorService]
})
export class View3dComponent implements AfterViewInit, OnDestroy {

  @ViewChild('myCanvas') private canvasRef!: ElementRef;
  thumbRaiser!: ThumbRaiser;
  private animationId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private buildingService: BuildingService,
    private floorService: FloorService
  ) { }

  buildings: Building[] = [];
  buildingCode: string = "";
  floors: Floor[] = []
  floorId: number = 0;

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

  initialize() {
    // Create the game
    this.thumbRaiser = new ThumbRaiser(
      this.canvas, // Canvas
      {}, // General Parameters
      { scale: new THREE.Vector3(1.0, 0.5, 1.0) }, // Maze parameters
      {}, // Player parameters
      { ambientLight: { intensity: 0.1 }, pointLight1: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(-3.5, 10.0, 2.5) }, pointLight2: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(3.5, 10.0, -2.5) } }, // Lights parameters
      {}, // Fog parameters
      { view: "fixed", multipleViewsViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5) }, // Fixed view camera parameters
      { view: "first-person", multipleViewsViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -10.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // First-person view camera parameters
      { view: "third-person", multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -20.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // Third-person view camera parameters
      { view: "top", multipleViewsViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0 }, // Top view camera parameters
      { view: "mini-map", multipleViewsViewport: new THREE.Vector4(0.99, 0.02, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.64 } // Mini-msp view camera parameters
    );

  }

  animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    // Update the game
    this.thumbRaiser.update();
  }

  ngOnInit(): void {
    this.listBuildings();
  }

  renderCanvas() {
    const theFloor = this.floors.find((floor: Floor) => floor.floorId == this.floorId);

    if (theFloor?.floorMap.map.length! > 0) {
      this.initialize();
      this.animate = this.animate.bind(this);
      this.animate();
    } else {
      alert("No floor map found");
    }
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

}