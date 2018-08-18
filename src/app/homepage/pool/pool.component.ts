import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() lastBlockHTMLSelector: string;
  @Input() forToken: string;
  @Input() isActive: boolean;

  @ViewChild('matExpansionPanel') expansionPanel: MatExpansionPanel;

  addPoolForm: FormGroup;
  onRemovePoolSubscr: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.onRemovePoolSubscr.unsubscribe();
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
    this.onRemovePoolSubscr = this.db.removePool$(this.name).subscribe();
    this.expansionPanel.close();
  }

  poolActiveToggle() {
    console.log(!this.isActive);
    this.db.setPoolToggle$(this.name, !this.isActive)
      .subscribe(
        (result) => { console.log('toggled'); },
        (err) => { console.log('error toggling'); });
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
