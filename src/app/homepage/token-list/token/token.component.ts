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
  onAddSubscription: Subscription;

  constructor(private db: DatabaseService,
    private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.pools = await this.db.getTokenPools(this.name).toPromise();

    this.db.onAddPool$.subscribe((pool: IPool) => {
      console.log('POOL ADDED DETECTED');
      if (pool.forToken === this.name) {
        this.pools.push(pool);
        this.cdr.detectChanges();
        console.log('IN THE IF');
        console.log(pool);
      }
    });

    this.db.onRemovePool$.subscribe((poolToRemove: IPool) => {

      const poolIndex = this.pools.findIndex(pool => pool.name === poolToRemove.name);
      if (poolIndex >= 0) {
      }
      this.pools.splice(poolIndex, 1);

    });

  }

  ngOnDestroy(): void {
    this.onAddSubscription.unsubscribe();
  }

  addPool(poolName: string, url: string, lastBlockHTMLSelector: string): void {

    const pool: IPool = {
      name: poolName,
      url: url,
      lastBlockHTMLSelector,
      forToken: this.name,
      active: false
    };

    // this.onAddSubscription =
    this.db.addPool(pool)
      .subscribe(
        (poolAdded) => { console.log(poolAdded); },
        (err) => { console.log(err); });
  }
}
