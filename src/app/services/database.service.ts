import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, ObservableInput } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import IPool from '../models/IPool';
import IToken from '../models/IToken';
import { ChromeRepositoryService } from './chromeRepository.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private chromeRepo: ChromeRepositoryService,
  ) { }

  onAddPool$ = new Subject<IPool>();
  onRemovePool$ = new Subject<IPool>();

  onPoolActiveToggle$ = new Subject<any | void>();

  addPool(pool: IPool): Observable<void> {
    return Observable.create(observer => {

      this.chromeRepo.addEntity('pools', pool)
        .subscribe(poolAdded => {
          this.onAddPool$.next(poolAdded);
          observer.next(poolAdded);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  removePool(poolName: string): Observable<IPool> {

    return Observable.create((observer: Observer<IPool>) => {
      this.chromeRepo.removeEntity('pools', poolName)
        .subscribe(pool => {
          this.onRemovePool$.next(pool as IPool);
        }, error => {
          observer.error(error);
        });
    });
  }

  setPoolToggle$(poolName: string, isActive: boolean) {
    return Observable.create(observer => {

      this.chromeRepo.setEntityProperty('pools', poolName, { active: isActive })
        .subscribe(pool => {
          this.onPoolActiveToggle$.next(pool);
          observer.next(pool);
          observer.complete();
        }, error => {
          observer.error(error);
        });

      //   chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
      //     if (!response.pools) {
      //       response = { pools: [] };
      //     }
      //     const poolToToggleIndex: number = response.pools.findIndex(
      //       (existingPool) => {
      //         return existingPool.name === poolName;
      //       }
      //     );

      //     if (poolToToggleIndex > -1) {

      //       response.pools[poolToToggleIndex].active = isActive;

      //       chrome.storage.sync.set({ pools: response.pools }, () => {
      //         this.onPoolActiveToggle$.next();
      //         observer.next();
      //         observer.complete();
      //       });
      //     } else {
      //       observer.error();
      //     }
      //   });
    });
  }

  getTokens(): Observable<IToken[]> {

    return Observable.create(observer => {

      this.chromeRepo.getTableEntities('tokens')
        .subscribe(tokens => {

          if (!tokens) {
            // TODO remove dummy data
            // reject('No tokens found');
            tokens = [{ name: 'ravencoin' }, { name: 'ether' }];
          }

          console.log(tokens);
          observer.next(tokens);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  getTokenPools(tokenName: string): Observable<IPool[]> {

    // return this.chromeRepo.getTableEntities('pools');

    // TODO implement DB service, not to directly acces chrome API's
    return Observable.create(observer => {

      chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
        if (!response.pools) {
          // reject('There are no pools for this token');
          response.pools = [
            { name: '1', lastBlockHTMLSelector: 'sel', url: 'some url here...', forToken: 'ravencoin', active: false },
            { name: '2', lastBlockHTMLSelector: 'sel 2', url: 'some url here...', forToken: 'ether', active: false }
          ];
        }
        const poolsOfToken: IPool[] = findPoolsOfToken(response.pools, 'forToken', tokenName);

        observer.next(poolsOfToken);
        observer.complete();
      });
    });

    function findPoolsOfToken(arr: any[], searchParameter: string, val: any): any[] {

      const response = [];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i][searchParameter] === val) {
          response.push(arr[i]);
        }
      }
      return response;
    }
  }

  setTokenHopData(token: IToken, pool: IPool, data: {}): Promise<void> {
    return new Promise((resolve, reject) => {

      // chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
      //   if (!response.pools) {
      //     response = { pools: [] };
      //   }
      //   const poolToToggleIndex: number = response.pools.findIndex(
      //     (existingPool) => {
      //       return existingPool.name === poolName;
      //     }
      //   );

      //   if (poolToToggleIndex > -1) {

      //     response.pools[poolToToggleIndex].active = isActive;

      //     chrome.storage.sync.set({ pools: response.pools }, () => {
      //       this.onPoolActiveToggle$.next();
      //       resolve();
      //     });
      //   } else {
      //     reject();
      //   }
      // });



    });
  }

}
