import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  @Input() name: string;
  @Input() lastBlockHTMLSelector: string;

  @Input() forToken: string;

  constructor() { }

  ngOnInit() {
  }


}
