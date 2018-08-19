import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

  addPool$(pool: IPool): Observable<IPool> {
    return <Observable<IPool>>this.chromeRepo.addEntity('pools', pool)
      .pipe(
        tap(poolAdded => {
          this.onAddPool$.next(poolAdded);
        })
      );
  }

  removePool$(poolName: string): Observable<IPool> {

    return <Observable<IPool>>this.chromeRepo.removeEntity('pools', poolName)
      .pipe(
        tap(pool => {
          this.onRemovePool$.next(pool as IPool);
        })
      );
  }

  setPoolToggle$(poolName: string, isActive: boolean): Observable<IPool> {

    return <Observable<IPool>>this.chromeRepo.setEntityProperty('pools', poolName, { active: isActive })
      .pipe(
        tap(pool => {
          this.onPoolActiveToggle$.next(pool);
        })
      );
  }

  getTokens$(): Observable<IToken[]> {
    return this.chromeRepo.getTableEntities('tokens');
  }

  getTokenPools$(tokenNames: string[]): Observable<IPool[]> {

    return this.chromeRepo.getTableEntities('pools')
      .pipe(
        map((pools: IPool[]) => {

          let response: IPool[] = [];

          if (!pools) {
            // reject('There are no pools for this token');
            // TODO remove mock data
            response.push({ name: '1', lastBlockHTMLSelector: 'sel', url: 'some url here...', forToken: 'ravencoin', active: false });
            response.push({ name: '2', lastBlockHTMLSelector: 'sel 2', url: 'some url here...', forToken: 'ether', active: false });
          }

          response = pools.filter(pool => {
            for (const tokenName of tokenNames) {
              if (pool.forToken === tokenName) {
                return true;
              }
            }
            return false;
          });

          return response;
        })
      );
  }

  setTokenHopData(token: IToken, pool: IPool, data: {}) {

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

  }

}
