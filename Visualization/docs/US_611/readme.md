# US611 - When navigating autonomously, regarding the course of the task, the elevator usage should have visual feedback.
## 1. Context

* First time that this task is developed.

## 2. Requirements

**Dependencies:**
- US609

## 3. Analysis

**Analyzing this User Story we understand that:**
* Once a robot that is navigating autonomously reaches an elevator, it should have visual feedback to show that is changing floors.
* After the animation is finished, the robot should have visual feedback to show in what floor it is now.

## 4. Implementation

thumb-raiser.js class - 

inside the function "if (this.maze.foundElevator(this.player.position) && infoElement.style.visibility != 'visible')"
```` javascript
```` javascript
const videoElement = document.createElement('video');
videoElement.src = './../../assets/View3D/animation_videos/ElevatorVideo.mp4';
videoElement.style.width = '100%';
videoElement.controls = false;
videoElement.style.zIndex = '102'

videoContainer.appendChild(videoElement);

videoElement.addEventListener('ended', function () {
document.getElementById('video-container').style.display = 'none';
  infoElement.innerHTML = 'The robot is now on Floor ' + nextFloor.floorNumber + '.';
  infoElement.style.visibility = 'visible';
  this.useElevator(eventDetail.elevatorID, nextFloor);
  setTimeout(function () {
    infoElement.style.visibility = 'hidden';
  }, 3000);
}.bind(this));

videoElement.play();
````

## 5. Observations

No observations.
