import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable, of, forkJoin } from 'rxjs';
import IPool from '../models/IPool';
import { map, mergeMap } from 'rxjs/operators';

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
      // TODO Realy needed data, to calculate the hop
      data: null
    };
  }

  startCrawler(pools: IPool[]): Observable<IPool[]> {

    console.log('Pools to crawl:');
    console.log(pools);

    return this.getUnopenPools(pools)
      .pipe(
        mergeMap((unopenedPools) => {
          return this.openPools(unopenedPools);
        }),
        mergeMap(() => {

          return Observable.create(observer => {
            return chrome.tabs.query({ currentWindow: true }, (tabs: ITab[]) => {

              const crawlingPools = [];

              for (const pool of pools) {
                const tabid = tabs.find(tab => {
                  return tab.url === pool.url;
                });
                crawlingPools.push(this.crawlPool(pool, tabid));
              }

              observer.next(crawlingPools);
            });
          });
        })
      )


    // TODO implement crawsler functionality
    // for now, mock the data

    // return of([]);
    // this.db.setTokenHopData()
  }

  getUnopenPools(allPools: IPool[]): Observable<IPool[]> {
    return Observable.create(observer => {
      chrome.tabs.query({ currentWindow: true }, tabs => {
        const unopenedPools = allPools.filter(pool => {
          const tabIndex = tabs.findIndex(tab => {
            return tab.url === pool.url;
          });

          if (tabIndex === -1) {
            return true;
          }
          return false;
        });
        observer.next(unopenedPools);
        observer.comlete();
      });
    });
  }

  openPools(pools: IPool[]): Observable<void> {
    return Observable.create(observer => {
      for (const pool of pools) {
        chrome.tabs.create({ 'url': pool.url }, tab => {
          console.log(`Tab opened:`);
          console.log(tab);
        });
      }
    });
  }

  crawlPool(pool: IPool, tabId): Observable<IPool> {

    return Observable.create(observer => {
      chrome.tabs.executeScript(tabId, {
        code: 'console.log(5);`'
      }, (result) => {
        console.log(result);
        observer.next(result);
        observer.complete();
      });
    });
  }
}
