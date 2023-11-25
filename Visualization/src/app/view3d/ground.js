import * as THREE from "three";

export default class Ground {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        this.object = new THREE.Object3D();
        this.initializeGround();
    }

    initializeGround() {
        const textureMap = {
            4: this.textureUrl,      // Inside Room
            5: this.textureUrl,      // Inside Room
            6: this.textureUrl,      // Inside Room
            7: this.textureUrl,      // Inside Room
            10: this.textureUrl,     // Inside Room
            11: this.textureUrl,     // Inside Room
            12: './../../assets/View3D/textures/passageway.png',  // Passageway
            13: './../../assets/View3D/textures/passageway.png',  // Passageway
            14: './../../assets/View3D/textures/elevator.png',    // Elevator
            0: './../../assets/View3D/textures/hallway.jpg',      // Hallway
            1: './../../assets/View3D/textures/hallway.jpg',      // Hallway
            2: './../../assets/View3D/textures/hallway.jpg',      // Hallway
            3: './../../assets/View3D/textures/hallway.jpg',      // Hallway
            8: './../../assets/View3D/textures/hallway.jpg',      // Hallway
            9: './../../assets/View3D/textures/hallway.jpg'       // Hallway
        };

        for (let i = 0; i < this.size.width+1; i++) {
            for (let j = 0; j < this.size.height+1; j++) {
                const value = this.array[j][i];
                const textureUrl = textureMap[value] || this.textureUrl; // Default to this.textureUrl if not found in textureMap

               if((i != this.size.width && j != this.size.height) ||((i == this.size.width || j == this.size.height) && (value == 12 || value == 14))){
                const texture = new THREE.TextureLoader().load(textureUrl);
                texture.encoding = THREE.sRGBEncoding;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1.0, 1.0);
                texture.magFilter = THREE.LinearFilter;
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                const geometry = new THREE.PlaneGeometry(1.0, 1.0);
                const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
                const square = new THREE.Mesh(geometry, material);
                square.position.set(i - this.size.width / 2.0 + 0.5, 0.0, j - this.size.height / 2.0 + 0.5);
                square.rotateX(-Math.PI / 2.0);
                square.castShadow = false;
                square.receiveShadow = true;

                this.object.add(square);    
               }
            }
        }
    }
}