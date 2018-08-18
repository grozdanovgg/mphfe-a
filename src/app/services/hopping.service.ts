import { Injectable } from '@angular/core';
import { CrawlerService } from './crawler.service';
import IPool from '../models/IPool';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoppingService {

  interval = 5000;

  constructor(private crawler: CrawlerService) { }

  startWatching(poolslist: IPool[]): Observable<Object> {
    return Observable.create(observer => {

      return this.checkIfControlSiteAvailable('https://simplemining.net/*')
        .subscribe(tab => {

          chrome.tabs.executeScript(
            tab.id,
            {
              file: 'assets/content.js'
            },
            (results) => {
              console.log(results);
            });

          console.log(tab);

          setInterval(() => {
            for (const pool of poolslist) {
              this.crawler.checkEl(pool.url, pool.lastBlockHTMLSelector);
            }
          }, this.interval);

          observer.next();
        }, (error) => {
          console.log(error);
          observer.error();
        });
    });
  }

  private checkIfControlSiteAvailable(controlSites: string): Observable<ITab> {
    return Observable.create(observer => {

      chrome.tabs.query({ currentWindow: true, url: controlSites }, (tabs: ITab[]) => {
        if (tabs.length === 1) {
          observer.next(tabs[0]);
        } else {
          observer.error('Control Website is not active, or there is more than 1 open in the current window');
        }
      });
    });
  }
}
