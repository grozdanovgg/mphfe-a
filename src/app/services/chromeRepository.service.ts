import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChromeRepositoryService {

  constructor() { }

  addEntity<T>(table: string, entity: T): Promise<T> {
    return new Promise((resolve, reject) => {

      chrome.storage.sync.get(table, (response) => {
        let isFirstEntity = false;

        if (!response[table]) {
          response = {};
          response[table] = [];
          isFirstEntity = true;
        }

        let duplicateEntity = -1;

        if (!isFirstEntity) {
          duplicateEntity = response[table].findIndex(
            (existingEntity) => {
              return existingEntity['name'] === entity['name'];
            }
          );
        }

        if (duplicateEntity === -1) {

          response[table].push(entity);

          chrome.storage.sync.set(response, () => {
            console.log('Value is set to: ');
            console.log(entity);

            resolve(entity);
          });
        } else {
          reject('Entity already exists. Uf you want to update, use otherDB method.');
        }
      });
    });
  }

  removeEntity<T>(key: string, unitName: string): Promise<T | void> {
    return new Promise((resolve, reject) => {

      chrome.storage.sync.get(key, response => {
        if (response[key]) {

          const entityToRemoveIndex = response[key].findIndex(
            (existingEntity) => {
              return existingEntity.name === unitName;
            }
          );

          if (entityToRemoveIndex > -1) {

            const entityToRemove = response[key][entityToRemoveIndex];

            response[key].splice(entityToRemoveIndex, 1);

            chrome.storage.sync.set(response[key], () => {
              resolve();
            });
          } else {
            reject(`The entity ${key} ${unitName['name']} does not exist in the Database.`);
          }
        } else {
          reject(`The entity ${key} ${unitName['name']} does not exist in the Database.`);
        }

      });

    });
  }

  setEntityProperty<T>(key: string, unitName: string, propertiesToSet: {}): Promise<T | void> {

    return new Promise((resolve, reject) => {

      chrome.storage.sync.get(key, response => {
        if (response[key]) {

          const indexOfEntityToChange: number = response[key].findIndex(
            (existingEntity) => {
              return existingEntity.name === unitName;
            }
          );

          if (indexOfEntityToChange > -1) {

            Object.keys(propertiesToSet).forEach(objKey => {

              response[key][indexOfEntityToChange][objKey] = propertiesToSet[objKey];
            });

            chrome.storage.sync.set(response, () => {
              resolve(response[key]);
            });

          } else {
            reject(`Entity doesn't exists`);
          }
        } else {
          reject(`Entity doesn't exists`);
        }

      });

    });

  }

}

  // addOrUpdateEntity<T>(key: string, data: T): Promise<T | void> {

  //   return new Promise((resolve, reject) => {

  //     chrome.storage.sync.get(key, response => {
  //       if (response[key]) {

  //         const indexOfEntityToChange: number = response[key].findIndex(
  //           (existingEntity) => {
  //             return existingEntity.name === unitName;
  //           }
  //         );

  //         if (indexOfEntityToChange > -1) {

  //           Object.keys(propertiesToSet).forEach(objKey => {

  //             response[key][indexOfEntityToChange][objKey] = propertiesToSet[objKey];
  //           });

  //           chrome.storage.sync.set(response, () => {
  //             resolve(response[key]);
  //           });

  //         } else {
  //           reject(`Entity doesn't exists`);
  //         }
  //       } else {
  //         reject(`Entity doesn't exists`);
  //       }

  //     });

  //   });
