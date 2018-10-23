import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChromeRepositoryService {

  constructor() { }

  addEntity<T>(tableName: string, entity: T): Observable<T> {
    return Observable.create((observer) => {

      chrome.storage.sync.get(tableName, (response) => {
        let isFirstEntity = false;

        if (!response[tableName]) {
          response = {};
          response[tableName] = [];
          isFirstEntity = true;
        }

        let duplicateEntity = -1;

        if (!isFirstEntity) {
          duplicateEntity = response[tableName].findIndex(
            (existingEntity) => {
              return existingEntity['name'] === entity['name'];
            }
          );
        }

        if (duplicateEntity === -1) {

          response[tableName].push(entity);

          chrome.storage.sync.set(response, () => {
            console.log('Value is set to: ');
            console.log(entity);

            observer.next(entity);
            observer.complete();
          });
        } else {
          observer.error('Entity already exists. Uf you want to update, use otherDB method.');
        }
      });
    });
  }

  removeEntity<T>(tableName: string, entityName: string): Observable<T> {
    return Observable.create((observer) => {

      chrome.storage.sync.get(tableName, response => {
        if (response[tableName]) {

          const entityToRemoveIndex = response[tableName].findIndex(
            (existingEntity) => {
              return existingEntity.name === entityName;
            }
          );

          if (entityToRemoveIndex > -1) {

            const entityToRemove = response[tableName][entityToRemoveIndex];

            response[tableName].splice(entityToRemoveIndex, 1);

            chrome.storage.sync.set(response, () => {
              observer.next(entityToRemove);
              observer.complete();
            });
          } else {
            observer.error(`The entity ${tableName} ${entityName['name']} does not exist in the Database.`);
          }
        } else {
          observer.error(`The entity ${tableName} ${entityName['name']} does not exist in the Database.`);
        }

      });

    });
  }

  getTableEntities<T>(tableName: string): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      chrome.storage.sync.get(tableName, response => {

        if (!response.tokens) {
          // TODO remove dummy data
          // reject('No tokens found');
          response.tokens = [{ name: 'ravencoin' }, { name: 'ether' }];
        }

        console.log(response);
        observer.next(response[tableName]);
        observer.complete();
      });
    });
  }

  setEntityProperty<T>(table: string, entityName: string, propertiesToSet: T): Observable<T> {

    return Observable.create((observer) => {

      chrome.storage.sync.get(table, response => {
        if (response[table]) {

          const indexOfEntityToChange: number = response[table].findIndex(
            (existingEntity) => {
              return existingEntity.name === entityName;
            }
          );

          if (indexOfEntityToChange > -1) {

            Object.keys(propertiesToSet).forEach(objKey => {

              response[table][indexOfEntityToChange][objKey] = propertiesToSet[objKey];
            });

            chrome.storage.sync.set(response, () => {
              observer.next(response[table][indexOfEntityToChange]);
              // observer.complete();
            });

          } else {
            observer.error(`Entity doesn't exists`);
          }
        } else {
          observer.error(`Entity doesn't exists`);
        }

      });

    });

  }

}
