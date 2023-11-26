import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import { forEach } from "lodash";
import * as TWEEN from '@tweenjs/tween.js';

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
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

                    //DOORS
                    if (description.mazeData.map[j][i] == 8 || description.mazeData.map[j][i] == 10) {
                        let clone = this.door.object.clone();
                        clone = new Door({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                        doorObject = clone.object.clone();
                        doorObject.rotateY(Math.PI / 2.0);
                        doorObject.position.set(i - description.mazeData.size.width / 2.0, 0.894, j - description.mazeData.size.height / 2.0 + 0.5);
                        this.object.add(doorObject);

                        this.doors.push({"door": doorObject, "state": "closed"});
                    }
                    if (description.mazeData.map[j][i] == 9 || description.mazeData.map[j][i] == 11) {
                        let clone = this.door.object.clone();
                        clone = new Door({ textureUrl: './../../assets/View3D/textures/ground.jpg' });
                        doorObject = clone.object.clone();
                        doorObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.894, j - description.mazeData.size.height / 2.0);
                        this.object.add(doorObject);

                        this.doors.push({"door": doorObject, "state": "closed"});
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
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }

        
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }

        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }

        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }

        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };

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

        if(this.map[indices[0]][indices[1]] == 9 || this.map[indices[0]][indices[1]] == 11) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }

        return Infinity;
    }  
    
    openDoor(position) {
        const closestDoor = this.closestDoor(position);
    
        if (closestDoor.state === "closed") {
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
            }
        }
    }


    closestDoor(position) {
        let minDistance = Infinity;
        let closestDoor = {
            door: null,
            state: null
        };

        for(const door of this.doors) {
            const doorPosition = door.door.position;
            const distance = position.distanceTo(doorPosition);

            if(distance < minDistance && distance < 1.5) {
                minDistance = distance;
                closestDoor.door = door.door;
                closestDoor.state = door.state;
            }
        }

        return closestDoor;
    }

}
