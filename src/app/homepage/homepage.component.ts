import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DatabaseService } from './../services/database.service';
import { HoppingService } from './../services/hopping.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import IPool from '../models/IPool';

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

  startHopping() {

    this.db.getTokens$()
      .pipe(
        mergeMap(tokens => {

          // Open unopened pools to mine
          const tokenNames = tokens.map(token => token.name);
          return this.db.getTokenPools$(tokenNames);
        }),
        map((pools: IPool[]) => {
          return pools.filter(pool => pool.active);
        }),
        mergeMap((pools: IPool[]) => {
          return this.hoppingService.startWatching(pools);
        }),
        tap(() => {
          this.hoppingIsActive = !this.hoppingIsActive;
        })
      )
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
        this.snackBar.open(error, 'close', { verticalPosition: 'top' });
      });
  }
}
