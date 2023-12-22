import * as THREE from "three";

export default class ElevatorDoor {
  constructor(parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      this[key] = value;
    }

    const frameSize = { width: 1.0, height: 1.788, depth: 0.045 };
    const doorSize = { width: (1.0 - 0.186) / 2, height: 1.686, depth: 0.035, gap: 0.0165 };
    this.object = new THREE.Group();

    // Create the frame
    const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x575757 });

    // Create a box geometry
    let geometry = new THREE.BoxGeometry(frameSize.width, frameSize.height, frameSize.depth);

    // Create a texture
    let texture = new THREE.TextureLoader().load("./../../assets/View3D/door_textures/frame_front.png");
    texture.encoding = THREE.sRGBEncoding;

    // Create a material
    let frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
    frontMaterial.transparent = true;

    // Create a texture
    texture = new THREE.TextureLoader().load("./../../assets/View3D/door_textures/frame_back.png");
    texture.encoding = THREE.sRGBEncoding;

    // Create a material
    let backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
    backMaterial.transparent = true;

    // Create a mesh with the specified geometry and materials
    let mesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);

    // Add the mesh to the scene
    this.object.add(mesh);

    // Create the elevator door panels

    // Create a box geometry
    geometry = new THREE.BoxGeometry(doorSize.width, doorSize.height, doorSize.depth);

    // Create a material for the door panels
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0, roughness: 0.5 });

    // Create the left door panel
    const leftDoor = new THREE.Mesh(geometry, doorMaterial);
    leftDoor.translateX(-(doorSize.width + doorSize.gap) / 2.0);

    // Create the right door panel
    const rightDoor = new THREE.Mesh(geometry, doorMaterial);
    rightDoor.translateX((doorSize.width + doorSize.gap) / 2.0);

    // Create a group for the elevator doors
    const elevatorDoors = new THREE.Group();

    // Add the door panels to the group
    elevatorDoors.add(leftDoor);
    elevatorDoors.add(rightDoor);

    // Add the group to the scene
    this.object.add(elevatorDoors);
  }

}
