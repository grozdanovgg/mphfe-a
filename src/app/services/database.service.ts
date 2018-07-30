import { Injectable } from '@angular/core';
import IPool from '../models/IPool';
import IToken from '../models/IToken';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  onAddPool$ = new Subject<IPool>();
  onRemovePool$ = new Subject<number>();

  onPoolActiveToggle$ = new Subject<void>();

  addPool(pool: IPool): Promise<IPool | void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
        if (!response.pools) {
          response = { pools: [] };
        }
        const duplicatePool = response.pools.findIndex(
          (existingPool) => {
            return existingPool.name === pool.name;
          }
        );

        if (duplicatePool === -1) {
          console.log('PUSHING:');
          console.log(pool);
          response.pools.push(pool);
          chrome.storage.sync.set({ pools: response.pools }, () => {
            console.log('Value is set to: ');
            console.log(pool);

            this.onAddPool$.next(pool);

            resolve(pool);
          });
        } else {
          reject('A pool with this name is already added.');
        }
      });
    });
  }

  removePool(poolName: string): Promise<IPool | void> {
    return new Promise((resolve, reject) => {

      chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
        if (!response.pools) {
          response = { pools: [] };
        }
        const poolToRemove = response.pools.findIndex(
          (existingPool) => {
            return existingPool.name === poolName;
          }
        );

        if (poolToRemove > -1) {

          response.pools.splice(poolToRemove, 1);

          chrome.storage.sync.set({ pools: response.pools }, () => {
            this.onRemovePool$.next(poolToRemove);
            resolve();
          });
        } else {
          reject();
        }
      });
    });
  }

  setPoolToggle(poolName: string, isActive: boolean) {
    return new Promise((resolve, reject) => {

      chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
        if (!response.pools) {
          response = { pools: [] };
        }
        const poolToToggleIndex: number = response.pools.findIndex(
          (existingPool) => {
            return existingPool.name === poolName;
          }
        );

        if (poolToToggleIndex > -1) {

          response.pools[poolToToggleIndex].active = isActive;

          chrome.storage.sync.set({ pools: response.pools }, () => {
            this.onPoolActiveToggle$.next();
            resolve();
          });
        } else {
          reject();
        }
      });
    });
  }

  getTokens(): Promise<IToken[]> {

    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['tokens'], (response: { tokens: IToken[] }) => {
        if (!response.tokens) {
          // TODO remove dummy data
          // reject('No tokens found');
          response.tokens = [{ name: 'ravencoin' }, { name: 'ether' }];
        }

        const tokens: IToken[] = response.tokens;
        resolve(tokens);
      });
    });
  }

  getTokenPools(tokenName: string): Promise<IPool[]> {
    return new Promise((resolve, reject) => {

      chrome.storage.sync.get(['pools'], (response: { pools: IPool[] }) => {
        if (!response.pools) {
          // reject('There are no pools for this token');
          response.pools = [
            { name: '1', lastBlockHTMLSelector: 'sel', url: 'some url here...', forToken: 'ravencoin', active: false },
            { name: '2', lastBlockHTMLSelector: 'sel 2', url: 'some url here...', forToken: 'ether', active: false }
          ];
        }
        const poolsOfToken: IPool[] = findPoolsOfToken(response.pools, 'forToken', tokenName);

        resolve(poolsOfToken);

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



}








