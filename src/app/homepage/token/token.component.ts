import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import IPool from '../../models/IPool';

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
  }

  async addPool(poolName: string, lastBlockHTMLSelector: string): Promise<void> {

    const pool: IPool = {
      name: poolName,
      lastBlockHTMLSelector,
      forToken: this.name
    };

    try {
      await this.db.addPool(pool);
      this.pools.push(pool);
    } catch (error) {
      console.log(error);
    }
  }

}
