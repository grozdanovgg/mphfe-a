import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DatabaseService } from './../services/database.service';
import { HoppingService } from './../services/hopping.service';
import { APP_CONFIG } from '../config/config';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  hoppingIsActive = false;

  constructor(
    private hoppingService: HoppingService,
    private db: DatabaseService,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  async startHopping() {

    try {
      const tokens = await this.db.getTokens().toPromise();
      const pools = await this.db.getTokenPools(tokens[0].name).toPromise();

      await this.hoppingService.startWatching(pools).toPromise();
      this.hoppingIsActive = !this.hoppingIsActive;

    } catch (error) {
      console.log(error);
      this.snackBar.open(error, 'close', { verticalPosition: 'top' });
    }
    // this.db.getTokens();

  }
}
