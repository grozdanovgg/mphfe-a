import { Injectable } from '@angular/core';
import { CrawlerService } from './crawler.service';
import IPool from '../models/IPool';

@Injectable({
  providedIn: 'root'
})
export class HoppingService {

  interval = 30000;

  constructor(private crawler: CrawlerService) { }

  startWatching(poolslist: [IPool]) {

    setTimeout(() => {
      for (const pool of poolslist) {
        this.crawler.checkEl(pool.url, pool.lastBlockHTMLSelector);
      }
    }, this.interval);

  }

}
