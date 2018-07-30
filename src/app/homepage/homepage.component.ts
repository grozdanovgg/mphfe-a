import { HoppingService } from './../services/hopping.service';
import { Component, OnInit } from '@angular/core';

enum StartStopText {
  Start = 'Start Hopping',
  Stop = 'Stop Hopping'
}

enum Colors {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  hoppingIsActive = false;
  startStopColor = Colors.primary;
  startStopBtnText = StartStopText.Stop;

  constructor(private hoppingService: HoppingService) {

  }

  ngOnInit() {
  }

  startHopping() {

    // this.hoppingService.startWatching(poolsList);

    this.hoppingIsActive = !this.hoppingIsActive;
    if (this.hoppingIsActive) {
      this.startStopBtnText = StartStopText.Stop;
      this.startStopColor = Colors.warn;
    } else {
      this.startStopBtnText = StartStopText.Start;
      this.startStopColor = Colors.primary;
    }
  }

}
