import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

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

  startCrawler(pools): void {
    // this.db.s
  }
}
