import { Injectable } from '@angular/core';
import { CrawlerService } from './crawler.service';
import IPool from '../models/IPool';
import { Observable } from '../../../node_modules/rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoppingService {

  interval = 5000;

  constructor(private crawler: CrawlerService) { }

  startWatching(poolsList: IPool[]): Observable<IPool[]> {
    return this.crawler.startCrawler(poolsList)
      .pipe(
        tap((pools: IPool[]) => {

          // TODO here we should get the pools to watch filled with fresh data, to calculate the best pool
          console.log(pools);
          // pools.subscribe((pools2) => {
          //   console.log(pools2);
          // });
        })
      );
  }

  // activateBestPool(poolsList: IPool[]): Observable<void> {
  //   return Observable.create(observer => {

  //     return this.checkIfControlSiteAvailable('https://simplemining.net/*')
  //       .subscribe(tab => {

  //         chrome.tabs.executeScript(
  //           tab.id,
  //           {
  //             file: 'assets/content.js'
  //           },
  //           (results) => {
  //             console.log(results);
  //           });

  //         console.log(tab);

  //         setInterval(() => {
  //           for (const pool of poolsList) {
  //             this.crawler.checkEl(pool.url, pool.lastBlockHTMLSelector);
  //           }
  //         }, this.interval);

  //         observer.next();
  //       }, (error) => {
  //         console.log(error);
  //         observer.error();
  //       });
  //   });
  // }

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
