import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @Input() isActive: boolean;

  @ViewChild('matExpansionPanel') expansionPanel: MatExpansionPanel;

  addPoolForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addPoolForm = this.formBuilder.group({
      name: this.name
    });
  }

  save() {
    // TODO
  }

  cancelEdit() {
    this.expansionPanel.close();
  }

  delete() {
    this.db.removePool(this.name);
    this.expansionPanel.close();
  }

  poolActiveToggle() {
    console.log(!this.isActive);
    this.db.setPoolToggle(this.name, !this.isActive)
      .then((result) => {
        console.log('toggled');
      }).catch((err) => {
        'error toggling';
      });
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event) {
    event.stopPropagation();

    if (!this.isExpansionIndicator(event.target)) {
      matExpansionPanel.toggle();
    }
  }

  private isExpansionIndicator(target: EventTarget): boolean {
    const expansionIndicatorClass = 'pool-edit-icon';
    return (target['classList'] && target['classList'].contains(expansionIndicatorClass));
  }
}
