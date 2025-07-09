import { Component, OnInit } from '@angular/core';
import { Action } from '../_models/action';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  allActions: Action[] = [];
  selectedAction!: Action;
  otherActions: Action[] = [];

  constructor(private action: ActionService) {}

  ngOnInit(): void {
    this.action.getAllActions().subscribe(actions => {
      this.allActions = actions.sort(
        (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );

      this.selectedAction = this.allActions[0]; // Latest
      this.otherActions = this.allActions.slice(1); // Remaining
    });
  }

  selectAction(action: Action): void {
    // Remove selected action from the list
    this.otherActions = this.allActions.filter(a => a !== action);
    this.selectedAction = action;
  }
}