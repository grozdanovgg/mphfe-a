import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  template: `
    <p>
      background works!
    </p>
  `,
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
