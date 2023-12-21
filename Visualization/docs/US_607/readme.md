# US607 - Ao navegar interactivamente e ao chegar a uma passagem entre edifícios, deve transitar automaticamente para o piso adjacente.

## 1. Context

* First time that this task is developed.

## 2. Requirements

**Dependencies:**
- **No dependencies**

## 3. Analysis
**Analyzing this User Story we understand that:**
* We need to create a proper visualization for passageway.
* When the robot arrives at a passage it must recognize it.
* The robot should be teleported to the other floor.

## 4. Implementation

#### Maze.js
```
foundPassageway(position){      
  const indices = this.cartesianToCell(position);
  if(this.map[indices[0]][indices[1]] == 12){
    return true;
  }
}
```

#### Thumb_raiser.js
```
    if(!this.maze.foundPassageway(this.player.position) && infoElement.style.visibility === 'visible'){
        infoElement.style.visibility = 'hidden';
        active = false;
    }

    if (this.maze.foundPassageway(this.player.position) && infoElement.style.visibility != 'visible') {
        //this.finalSequence();         
        infoElement.style.visibility = 'visible';

        window.addEventListener('keydown', (event) => {
                        
         if ((event.key === 'k' || event.key === 'K') && !active) {
             active = true;
             const robotCoordX = this.maze.cartesianToCell(this.player.position)[1]
             const robotCoordY = this.maze.cartesianToCell(this.player.position)[0]
             let passagewaysCoords = this.floorMapParameters.floor.floorMap.passagewaysCoords
             for (let i = 0; i < passagewaysCoords.length; i++) {
                 if((passagewaysCoords[i][1] == robotCoordX && passagewaysCoords[i][2] == robotCoordY) ||
                 (passagewaysCoords[i][3] == robotCoordX && passagewaysCoords[i][4] == robotCoordY)){
                     this.passagewayService.findFloorsByPassageway(passagewaysCoords[i][0]).subscribe(
                         floors => {
                             if(floors[0].floorId == this.floorMapParameters.floor.floorId){
                                 const newFloorCoords = this.newFloorCoords(floors[1],passagewaysCoords[i][0])
                                 const eventDetail = {
                                     floor: floors[1], 
                                     initialPosition: [Number(newFloorCoords[2]), Number(newFloorCoords[1])], 
                                 };
                                 const event = new CustomEvent('newFloorMap', { detail: eventDetail});
                                 window.dispatchEvent(event);
                             }else{
                                 const newFloorCoords = this.newFloorCoords(floors[0],passagewaysCoords[i][0])
                                 const eventDetail = {
                                     floor: floors[0], 
                                     initialPosition: [Number(newFloorCoords[2]), Number(newFloorCoords[1])], 
                                 };
                                 const event = new CustomEvent('newFloorMap', { detail: eventDetail});
                                 window.dispatchEvent(event);
                             }
                         },error => {
                                     console.error('Error fetching passageways:', error);
                                 }
                         );
                         break;
                 }                      
             }
         }
        });                      
    }
```

#### View3D Component
```
@HostListener('window:newFloorMap', ['$event'])
	onNewFloorMap(event: CustomEvent) {
		this.floorId = event.detail.floor.floorId;
		this.initialize(event.detail.floor,this.modelFile!,event.detail.initialPosition[0],event.detail.initialPosition[1]);
		this.animate = this.animate.bind(this);
		this.animate();
	}
```

## 5. Observations

