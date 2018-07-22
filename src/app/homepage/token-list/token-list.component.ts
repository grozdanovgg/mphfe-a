import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database.service';
import IToken from '../../models/IToken';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  tokens: IToken[]; // = [{ name: 'ravencoin' }, { name: 'ether' }];

  constructor(private db: DatabaseService) { }

  async ngOnInit() {
    // for (const token of this.tokens) {
    //   this.db.getTokenPools(token.name);
    // }
    try {
      this.tokens = await this.db.getTokens();
    } catch (error) {
      console.log(error);
    }
  }

}
