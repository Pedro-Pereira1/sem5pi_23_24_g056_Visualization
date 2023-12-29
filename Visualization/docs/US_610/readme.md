# US610 - When navigating autonomously, regarding the course of the task, the passageway usage should have visual feedback.

## 1. Context

* First time that this task is developed.

## 2. Requirements

**Dependencies:**

- US609

## 3. Analysis

**Analyzing this User Story we understand that:**

* Once a robot that is navigating autonomously reaches a passageway, it should have visual feedback to show that is changing buildings.
* After the animation is finished, the robot should have visual feedback to show in what floor it is now.

## 4. Implementation

thumb-raiser.js class -

inside the function "if (this.maze.foundPassageway(this.player.position) && infoElement.style.visibility != 'visible')"

```` javascript
                    const videoContainer = document.getElementById('video-container');
                    const videoElement = document.createElement('video');
                    videoElement.src = './../../assets/View3D/animation_videos/PassagewayVideo.mp4';
                    videoElement.style.width = '100%';
                    videoElement.controls = false;
                    videoElement.style.zIndex = '102'

                    videoContainer.appendChild(videoElement);

                    const robotCoordX = this.maze.cartesianToCell(this.player.position)[1]
                    const robotCoordY = this.maze.cartesianToCell(this.player.position)[0]
                    let passagewaysCoords = this.floorMapParameters.floor.floorMap.passagewaysCoords

                  videoElement.addEventListener('ended', function () {
                    document.getElementById('video-container').style.display = 'none';

                    for (let i = 0; i < passagewaysCoords.length; i++) {
                      if ((passagewaysCoords[i][1] == robotCoordX && passagewaysCoords[i][2] == robotCoordY) ||
                        (passagewaysCoords[i][3] == robotCoordX && passagewaysCoords[i][4] == robotCoordY)) {
                        this.passagewayService.findFloorsByPassageway(passagewaysCoords[i][0]).subscribe(
                          floors => {
                            if (floors[0].floorId == this.floorMapParameters.floor.floorId) {
                              const newFloorCoords = this.newFloorCoords(floors[1], passagewaysCoords[i][0])
                              const eventDetail = {
                                floor: floors[1],
                                initialPosition: [Number(newFloorCoords[2]), Number(newFloorCoords[1])],
                              };

                              const event = new CustomEvent('newFloorMap', {detail: eventDetail});
                              window.dispatchEvent(event);
                            } else {
                              const newFloorCoords = this.newFloorCoords(floors[0], passagewaysCoords[i][0])
                              const eventDetail = {
                                floor: floors[0],
                                initialPosition: [Number(newFloorCoords[2]), Number(newFloorCoords[1])],
                              };
                              const event = new CustomEvent('newFloorMap', {detail: eventDetail});
                              window.dispatchEvent(event);
                            }
                          }, error => {
                            console.error('Error fetching passageways:', error);
                          }
                        );
                        break;
                      }
                    }
                      floorElement.innerHTML = 'The robot is now on Floor ' + this.floorMapParameters.floor.floorNumber + ' of the next building.';
                      floorElement.style.visibility = 'visible';
                      setTimeout(function () {
                        floorElement.style.visibility = 'hidden';
                      }, 5000);

                  }.bind(this));
                  videoElement.play();
````

## 5. Observations

No observations.
