
import { Component, OnInit, Input } from '@angular/core';
import IPool from '../../../models/IPool';
import { DatabaseService } from '../../../services/database.service';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  @Input() name: string;

  pools: IPool[]; // = [{ name: '1', lastBlockHTMLSelector: 'sel' }, { name: '2', lastBlockHTMLSelector: 'sel 2' }];
  constructor(private db: DatabaseService) { }

  async ngOnInit() {
    this.pools = await this.db.getTokenPools(this.name);

    this.db.onAddPool$.subscribe((pool: IPool) => {
      if (pool.forToken === this.name) {
        this.pools.push(pool);
      }
    });

    this.db.onRemovePool$.subscribe((poolToRemove: IPool) => {

      const poolIndex = this.pools.findIndex(pool => pool.name === poolToRemove.name);
      if (poolIndex >= 0) {
      }
      this.pools.splice(poolIndex, 1);

    });

  }

  async addPool(poolName: string, url: string, lastBlockHTMLSelector: string): Promise<void> {

    const pool: IPool = {
      name: poolName,
      url: url,
      lastBlockHTMLSelector,
      forToken: this.name,
      active: false
    };

    try {
      await this.db.addPool(pool);

    } catch (error) {
      console.log(error);
    }
  }
}