import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  @Input() name: string;
  @Input() lastBlockHTMLSelector: string;
  @Input() forToken: string;

  addPoolForm: FormGroup;
  isActive = true;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addPoolForm = this.formBuilder.group({
      name: this.name
    });
  }


  addPool() {
    console.log(event);
  }
  cancelEdit() {

  }

  delete() {

  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event) {
    event.stopPropagation();

    if (!this.isExpansionIndicator(event.target)) {
      matExpansionPanel.toggle();
    }
  }

  private isExpansionIndicator(target: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    return (target['classList'] && target['classList'].contains(expansionIndicatorClass));
  }
}
