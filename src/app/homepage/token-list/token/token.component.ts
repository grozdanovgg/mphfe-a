import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import IPool from '../../../models/IPool';
import { DatabaseService } from '../../../services/database.service';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit, OnDestroy {
  @Input() name: string;

  pools: IPool[] = []; // = [{ name: '1', lastBlockHTMLSelector: 'sel' }, { name: '2', lastBlockHTMLSelector: 'sel 2' }];
  activeSubscriptions: Subscription[] = [];

  constructor(
    private db: DatabaseService,
    private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.pools = await this.db.getTokenPools$([this.name]).toPromise();

    const addPoolSubscr = this.db.onAddPool$.subscribe((pool: IPool) => {
      console.log('POOL ADDED DETECTED');
      if (pool.forToken === this.name) {
        this.pools.push(pool);
        this.cdr.detectChanges();
        console.log('IN THE IF');
        console.log(pool);
      }
    });

    const removePoolSubscr = this.db.onRemovePool$.subscribe((poolToRemove: IPool) => {

      const poolIndex = this.pools.findIndex(pool => pool.name === poolToRemove.name);
      if (poolIndex >= 0) {
      }
      this.pools.splice(poolIndex, 1);

    });

    this.activeSubscriptions.push(addPoolSubscr);
    this.activeSubscriptions.push(removePoolSubscr);
  }

  ngOnDestroy(): void {
    this.activeSubscriptions.forEach(subscrubtion => {
      subscrubtion.unsubscribe();
    });
  }

  addPool(poolName: string, url: string, lastBlockHTMLSelector: string): void {

    const pool: IPool = {
      name: poolName,
      url: url,
      lastBlockHTMLSelector,
      forToken: this.name,
      active: false
    };

    const addPoolSubscr = this.db.addPool$(pool)
      .subscribe(
        poolAdded => {
          console.log(poolAdded);
        }, err => {
          console.log(err);
        });

    this.activeSubscriptions.push(addPoolSubscr);
  }
}
