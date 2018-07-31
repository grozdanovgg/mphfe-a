import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {

  constructor() { }

  checkEl(url: string, selector: string) {
    console.log(url);
    console.log(selector);

    if (true) {
      chrome.tabs.query({ active: true }, (tab) => {
        console.log(tab);
        chrome.tabs.sendMessage(tab[0].id, { hopTo: 'omegapool' });
        console.log('SENT TO CONTENT');
      });
    }
  }
}
