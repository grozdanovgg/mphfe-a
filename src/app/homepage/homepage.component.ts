
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import IToken from '../models/IToken';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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
