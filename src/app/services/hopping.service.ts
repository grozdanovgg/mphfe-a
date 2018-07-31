import { Injectable } from '@angular/core';
import { CrawlerService } from './crawler.service';
import IPool from '../models/IPool';

@Injectable({
  providedIn: 'root'
})
export class HoppingService {

  interval = 30000;

  constructor(private crawler: CrawlerService) { }

  async startWatching(poolslist: IPool[]): Promise<Object> {
    return new Promise(async (res, rej) => {

      try {
        const controlSite = await this.checkIfControlSiteAvailable('https://simplemining.net/*');
        console.log(controlSite);

        setTimeout(() => {
          for (const pool of poolslist) {
            this.crawler.checkEl(pool.url, pool.lastBlockHTMLSelector);
          }
        }, this.interval);

        res();

      } catch (error) {
        console.log(error);
        rej();
      }
    });
  }

  private checkIfControlSiteAvailable(controlSites: string): Promise<string> {
    return new Promise((res, rej) => {

      chrome.tabs.query({ currentWindow: true, url: controlSites }, (tabs: ITab[]) => {
        if (tabs.length === 1) {
          res(tabs[0].url);
        } else {
          rej('Control Website is not active, or there is more than 1 open in the current window');
        }
      });
    });
  }
}
