import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import ElevatorDoor from "./elevatorDoor.js";
import { forEach } from "lodash";
import * as TWEEN from '@tweenjs/tween.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    elevators = [];

    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.mazeData.map;
            this.size = description.mazeData.size;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.mazeData.initialPosition);
            this.initialDirection = description.mazeData.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.mazeData.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: description.mazeData.groundTextureUrl, size: description.mazeData.size, array: description.mazeData.map });
            let groundObject;
            this.object.add(this.ground.object)

            // Create a wall
            this.wall = new Wall({ textureUrl: description.mazeData.wallTextureUrl });
            this.door = new Door({ textureUrl: description.mazeData.doorTextureUrl });
            this.doors = [];
            // Build the maze
            let wallObject;
            let doorObject;
            console.log(description.mazeData.size.width);
            console.log(description.mazeData.size.height);
            for (let i = 0; i <= description.mazeData.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.mazeData.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    if (description.mazeData.map[j][i] == 2 || description.mazeData.map[j][i] == 3 || description.mazeData.map[j][i] == 6 || description.mazeData.map[j][i] == 7) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.mazeData.map[j][i] == 1 || description.mazeData.map[j][i] == 3 || description.mazeData.map[j][i] == 5 || description.mazeData.map[j][i] == 7) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }

                    if(description.mazeData.map[j][i] == 14){
                        console.log(this.elevatorDoorData)

                        for(let k = 0; k < this.elevatorDoorData.length; k++){
                            if(this.elevatorDoorData[k][1] == i && this.elevatorDoorData[k][2] == j){
                                let wallObject1 = this.wall.object.clone();
                                let wallObject2 = this.wall.object.clone();
                                let wallObject3 = this.wall.object.clone();
                                
                                if(this.elevatorDoorData[k][3] == 1){ //NORTH
                                    //let clone = this.door.object.clone();
                                    //clone = new ElevatorDoor({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                                    //doorObject = clone.object.clone();
                                    //doorObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                                    //this.object.add(doorObject);
                                    //this.doors.push({"door": doorObject, "state": "closed", "type": "elevator"});

                                    wallObject1.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, 1 + j - description.mazeData.size.height / 2.0);
                                    this.object.add(wallObject1);

                                    wallObject2.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    wallObject2.rotateY(Math.PI / 2.0);
                                    this.object.add(wallObject2);
                            
                                    wallObject3.position.set(i + 1 - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    wallObject3.rotateY(Math.PI / 2.0);
                                    this.object.add(wallObject3);
                                     
                                }else if(this.elevatorDoorData[k][3] == 2){ // SOUTH
                                    //let clone = this.door.object.clone();
                                    //clone = new ElevatorDoor({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                                    //doorObject = clone.object.clone();
                                    //doorObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0 + 1);
                                    //this.object.add(doorObject);
                                    //this.doors.push({"door": doorObject, "state": "closed", "type": "elevator"});   
                                    
                                    wallObject1.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                                    this.object.add(wallObject1);

                                    wallObject2.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    wallObject2.rotateY(Math.PI / 2.0);
                                    this.object.add(wallObject2);
                            
                                    wallObject3.position.set(i + 1 - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    wallObject3.rotateY(Math.PI / 2.0);
                                    this.object.add(wallObject3);


                                }else if(this.elevatorDoorData[k][3] == 3){ // WEST
                                    //let clone = this.door.object.clone();
                                    //clone = new ElevatorDoor({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                                    //doorObject = clone.object.clone();
                                    //doorObject.rotateY(Math.PI / 2.0);
                                    //doorObject.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    //this.object.add(doorObject);
                                    //this.doors.push({"door": doorObject, "state": "closed", "type": "elevator"}); 

                                    wallObject1.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                                    this.object.add(wallObject1);

                                    wallObject2.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894,1 + j - description.mazeData.size.height / 2.0);
                                    this.object.add(wallObject2);
                            
                                    wallObject3.position.set(i + 1 - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    wallObject3.rotateY(Math.PI / 2.0);
                                    this.object.add(wallObject3);

                                }else if(this.elevatorDoorData[k][3] == 4){ // EAST
                                    //let clone = this.door.object.clone();
                                    //clone = new ElevatorDoor({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                                    //doorObject = clone.object.clone();
                                    //doorObject.rotateY(Math.PI / 2.0);
                                    //doorObject.position.set(i - description.mazeData.size.width / 2.0 + 1, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    //this.object.add(doorObject);
                                    //this.doors.push({"door": doorObject, "state": "closed", "type": "elevator"}); 

                                    wallObject1.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                                    this.object.add(wallObject1);

                                    wallObject2.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894,1 + j - description.mazeData.size.height / 2.0);
                                    this.object.add(wallObject2);
                            
                                    wallObject3.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                                    wallObject3.rotateY(Math.PI / 2.0);
                                    this.object.add(wallObject3);

                                }
                                break;
                            }
                        }
                    }


                    if(description.mazeData.map[j][i] == 12){
                        if((i == description.mazeData.size.width && description.mazeData.map[j+1][i] == 12) || 
                           (i == 0 && description.mazeData.map[j+1][i] == 12)){
                            let wallObject1 = this.wall.object.clone();
                            let wallObject2 = this.wall.object.clone();

                            wallObject1.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                            this.object.add(wallObject1);
                            
                            wallObject2.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j + 2 - description.mazeData.size.height / 2.0);
                            this.object.add(wallObject2);
                        }else if((j == description.mazeData.size.height && description.mazeData.map[j][i+1] == 12) || 
                        (j == 0 && description.mazeData.map[j][i+1] == 12)){

                            let wallObject1 = this.wall.object.clone();
                            let wallObject2 = this.wall.object.clone();

                            wallObject1.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                            wallObject1.rotateY(Math.PI / 2.0);
                            this.object.add(wallObject1);
                            
                            wallObject2.position.set(i + 2 - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                            wallObject2.rotateY(Math.PI / 2.0);
                            this.object.add(wallObject2);
                        }

                    }

                    //DOORS
                    if (description.mazeData.map[j][i] == 8 || description.mazeData.map[j][i] == 10) {
                        let clone = this.door.object.clone();
                        clone = new Door({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                        doorObject = clone.object.clone();
                        doorObject.rotateY(Math.PI / 2.0);
                        doorObject.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                        this.object.add(doorObject);

                        this.doors.push({"door": doorObject, "state": "closed", "type": "normal"});
                    }
                    if (description.mazeData.map[j][i] == 9 || description.mazeData.map[j][i] == 11) {
                        let clone = this.door.object.clone();
                        clone = new Door({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                        doorObject = clone.object.clone();
                        doorObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                        this.object.add(doorObject);

                        this.doors.push({"door": doorObject, "state": "closed", "type": "normal"});
                    }
                }
            }

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        this.onLoad(parameters)

        /*
        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );

        */
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);

       if(indices[1] == 0){
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }

        if (this.map[indices[0]] && (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3  || this.map[indices[0]][indices[1]] == 5 || this.map[indices[0]][indices[1]] == 7)) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }else if (this.map[indices[0]] && this.map[indices[0]][indices[1]] == 12) {
            if (this.map[indices[0]][indices[1] + 1] == 12) {
                return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
            }
         }
    
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;

        if(indices[1] == this.map[indices[0]].length){
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 5|| this.map[indices[0]][indices[1]] == 7) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }else if(this.map[indices[0]][indices[1] - 1] == 12){
            if(this.map[indices[0]] && this.map[indices[0]][indices[1] - 2] == 12){
                return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
            }
        }else if(this.map[indices[0]][indices[1]] == 12 && this.map[indices[0]][indices[1] + 1] == 12){
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        

        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);

        if(indices[0] == 0){
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 6 || this.map[indices[0]][indices[1]] == 7) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }else if(this.map[indices[0]][indices[1]] == 12){
            if(this.map[indices[0] + 1] && this.map[indices[0] + 1][indices[1]] == 12){
                return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
            }
         }

        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        
        if(indices[0] == this.map.length){
            if(this.map[indices[0] - 1][indices[1]] == 12){
                return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
            }
            return Infinity;
        }else if(indices[0] == this.map.length-1 && this.map[indices[0] - 1][indices[1]] == 12){
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
     
        
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 6 || this.map[indices[0]][indices[1]] == 7) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }else if(this.map[indices[0]][indices[1]] == 12){
            if(this.map[indices[0] + 1] && this.map[indices[0] + 1][indices[1]] == 12){
                return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
            }
        }

        if(this.map[indices[0] - 1] && this.map[indices[0] - 2] && this.map[indices[0] - 1][indices[1]] == 12 && this.map[indices[0] - 2][indices[1]] == 12){
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
            

        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };


    foundPassageway(position){      
        const indices = this.cartesianToCell(position);
        if(this.map[indices[0]][indices[1]] == 12){
            return true;
        }
    }

    foundElevator(position){      
        const indices = this.cartesianToCell(position);
        if(this.map[indices[0]][indices[1]] == 14){
            return true;
        }
    }

    distanceToWestWallDoor(position) {
        const indices = this.cartesianToCell(position);
        

        if(this.map[indices[0]][indices[1]] == 8 || this.map[indices[0]][indices[1]] == 10) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        
        return Infinity;
    }

    distanceToEastWallDoor(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;

        if(this.map[indices[0]][indices[1]] == 8 || this.map[indices[0]][indices[1]] == 10) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }

        return Infinity;
    }

    distanceToNorthWallDoor(position) {
        const indices = this.cartesianToCell(position);

        if(this.map[indices[0]][indices[1]] == 9 || this.map[indices[0]][indices[1]] == 11) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }

        return Infinity;
    }

    distanceToSouthWallDoor(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;

        if(indices[0] == this.map.length){
            return Infinity;
        }

        if(this.map[indices[0]][indices[1]] == 9 || this.map[indices[0]][indices[1]] == 11) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }

        //if(this.map[indices[0] - 1] && this.map[indices[0] - 1][indices[1]] == 14){
        //    return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        //}

        return Infinity;
    }  
    
    openDoor(position) {
        const closestDoor = this.closestDoor(position);
    
        if (closestDoor.state === "closed") {
            if(closestDoor.type == "normal"){
                // Define the initial and target positions for the door animation
                const initialPosition = closestDoor.door.position.clone();
                const targetPosition = initialPosition.clone();
                targetPosition.y -= 3.0; // Adjust the target position according to your door's movement direction
                
                // Set up a Tween animation
                const tween = new TWEEN.Tween(initialPosition)
                    .to(targetPosition, 1000) // Adjust the duration of the animation as needed
                    .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function for a smoother effect
                    .onUpdate(() => {
                        // Update the door's position during the animation
                        closestDoor.door.position.copy(initialPosition);
                    })
                    .onComplete(() => {
                        // Update the door state after the animation is complete
                        closestDoor.state = "open";
                    })
                    .start(); // Start the animation
                
                // Store the tween object if you want to manipulate or stop it later
                closestDoor.tween = tween;

            }else if(closestDoor.type == "elevator"){
                

            }
        }
    }
    


    doorState(position){
        let door = this.closestDoor(position);

        return door.state;
    }

    closeDoors(position) {
        for(const door of this.doors) {
            const doorPosition = door.door.position;
            const distance = position.distanceTo(doorPosition);
            
            if(distance > 1.5 && door.door.position.y < 0.0) {

                if(door.type == "normal"){
                    const initialPosition = door.door.position.clone();
                    const targetPosition = initialPosition.clone();
                    targetPosition.y = 0.894; // Adjust the target position according to your door's movement direction
                    
                    // Set up a Tween animation
                    const tween = new TWEEN.Tween(initialPosition)
                        .to(targetPosition, 1000) // Adjust the duration of the animation as needed
                        .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function for a smoother effect
                        .onUpdate(() => {
                            // Update the door's position during the animation
                            door.door.position.copy(initialPosition);
                        })
                        .onComplete(() => {
                            // Update the door state after the animation is complete
                            door.state = "closed";
                        })
                        .start(); // Start the animation
                    
                    // Store the tween object if you want to manipulate or stop it later
                    door.tween = tween;
                }else if(door.type == "elevator"){
                                   

                }
            }
        }
    }


    closestDoor(position) {
        let minDistance = Infinity;
        let closestDoor = {
            door: null,
            state: null,
            type: null
        };

        for(const door of this.doors) {
            const doorPosition = door.door.position;
            const distance = position.distanceTo(doorPosition);

            if(distance < minDistance && distance < 1.5) {
                minDistance = distance;
                closestDoor.door = door.door;
                closestDoor.state = door.state;
                closestDoor.type = door.type;
            }
        }

        return closestDoor;
    }

}
