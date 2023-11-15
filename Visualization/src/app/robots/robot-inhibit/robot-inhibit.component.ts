import { Component } from '@angular/core';
import { Robot } from 'src/app/domain/robot/Robot';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-robot-inhibit',
  templateUrl: './robot-inhibit.component.html',
  styleUrls: ['./robot-inhibit.component.css'],
  providers: [RobotService]
})
export class RobotInhibitComponent {

  constructor(
    private robotService: RobotService
  ) { }

  index: number = 0
  expanded: boolean[] = [false];
  robots: Robot[] = [];

  ngOnInit() {
    this.robotService.listAllRobots().subscribe((data: Robot[]) => {
      this.robots = data;
    });
  }

  inhibitRobot(robotId: string) {
    this.robotService.inhibitRobot(robotId).subscribe((data: Robot) => {
      window.alert("Robot " + data.code + " inhibited successfully!")
      this.update()
    });
  }

  private update() {
    this.robotService.listAllRobots().subscribe((data: Robot[]) => {
      this.robots = data;
    });
  }

}
