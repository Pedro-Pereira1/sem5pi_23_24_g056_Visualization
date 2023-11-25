import * as THREE from "three";
/*
 * parameters = {
 *  textureUrl: String
 * }
 */

export default class Door {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        const frameSize = { width: 1.0, height: 1.788, depth: 0.045 };
        const doorSize = { width: 1.0 -0.186, height: 1.686, depth: 0.035, gap: 0.0465 };
        this.object = new THREE.Group();

        // Create the frame
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xc36e2d });

            // Create a box geometry
       let geometry = new THREE.BoxGeometry(frameSize.width, frameSize.height, frameSize.depth);

            // Create a texture
        let texture = new THREE.TextureLoader().load("./../../assets/View3D/door_textures/frame_front.png");
        texture.colorSpace = THREE.SRGBColorSpace;

            // Create a material
        let frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        frontMaterial.transparent = true;

            // Create a texture
        texture = new THREE.TextureLoader().load("./../../assets/View3D/door_textures/frame_back.png");
        texture.colorSpace = THREE.SRGBColorSpace;

            // Create a material
        let backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        backMaterial.transparent = true;

        // Create a mesh with the specified geometry and materials
        let mesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);

        // Add the mesh to the scene
        this.object.add(mesh);


        // Create the door

        // Create a box geometry
        geometry = new THREE.BoxGeometry(doorSize.width, doorSize.height, doorSize.depth);

        // Create a texture
        texture = new THREE.TextureLoader().load("./../../assets/View3D/door_textures/door_front.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create a texture
        texture = new THREE.TextureLoader().load("./../../assets/View3D/door_textures/door_back.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create a mesh with the specified geometry and materials
        mesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);
        mesh.translateX(doorSize.width / 2.0);
        mesh.translateY(-doorSize.gap);

        // Create a group

        const door = new THREE.Group();

        // Add the mesh to the group
        door.add(mesh);
        door.translateX(-doorSize.width / 2.0);

        // Add the group to the scene
        this.object.add(door);



        
    }  
}