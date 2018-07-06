import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  template: `
    <p>
      popup works!
    </p>
  `,
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
