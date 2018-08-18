import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable, of } from 'rxjs';
import IPool from '../models/IPool';

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {

  constructor(private db: DatabaseService) { }

  checkEl(url: string, selector: string) {
    console.log(url);
    console.log(selector);

    // if (true) {
    //   chrome.tabs.query({ active: true }, (tab) => {
    //     console.log(tab);
    //     chrome.tabs.sendMessage(tab[0].id, { hopTo: 'omegapool' });
    //     console.log('SENT TO CONTENT');
    //   });
    // }

    return {
      // TODO Realy needet data, to calculate the hop
      data: null
    };
  }

  startCrawler(pools): Observable<IPool[]> {

    console.log('Pools to crawl:');
    console.log(pools);

    return of([]);
    // this.db.setTokenHopData()
  }
}
