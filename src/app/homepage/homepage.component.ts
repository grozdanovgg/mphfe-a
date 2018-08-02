import { DatabaseService } from './../services/database.service';
import { HoppingService } from './../services/hopping.service';
import { Component, OnInit } from '@angular/core';

enum StartStopText {
  Start = 'START Hopping',
  Stop = 'STOP Hopping'
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
  startStopBtnText = StartStopText.Start;

  constructor(private hoppingService: HoppingService,
    private db: DatabaseService) {

  }

  ngOnInit() {
  }

  async startHopping() {

    try {
      const tokens = await this.db.getTokens().toPromise();
      const pools = await this.db.getTokenPools(tokens[0].name).toPromise();

      await this.hoppingService.startWatching(pools).toPromise();
      this.hoppingIsActive = !this.hoppingIsActive;
      if (this.hoppingIsActive) {
        this.startStopBtnText = StartStopText.Stop;
        this.startStopColor = Colors.warn;
      } else {
        this.startStopBtnText = StartStopText.Start;
        this.startStopColor = Colors.primary;
      }
    } catch (error) {
      console.log(error);
    }
    // this.db.getTokens();

  }

}
