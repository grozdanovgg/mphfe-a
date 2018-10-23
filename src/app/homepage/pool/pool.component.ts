import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';
import { Subscription } from '../../../../node_modules/rxjs';
import IPool from 'src/app/models/IPool';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit, OnDestroy {

  @Input() pool: IPool;
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
      htmlSelector: [this.pool.lastBlockHTMLSelector, null]
    });
  }

  save() {
    console.log(this.addPoolForm);
    const pool: IPool = {
      name: this.pool.name,
      url: this.pool.url,
      lastBlockHTMLSelector: this.addPoolForm.value.htmlSelector
    };

    const editPoolSubsc = this.db.editPool$(pool).subscribe();
  }

  cancelEdit() {
    this.expansionPanel.close();
  }

  delete() {
    this.onRemovePoolSubscr = this.db.removePool$(this.pool.name).subscribe();
    this.expansionPanel.close();
  }

  poolActiveToggle() {
    console.log(!this.pool.active);
    this.db.setPoolToggle$(this.pool.name, !this.pool.active)
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
