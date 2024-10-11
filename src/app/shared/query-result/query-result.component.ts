import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QueryResult } from '../../types';
import { initialResult } from '../../core/result.utils';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-query-result',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './query-result.component.html',
  styleUrl: './query-result.component.css',
})
export class QueryResultComponent {
  @Input({ required: true }) result: Pick<
    QueryResult<unknown>,
    'status' | 'error'
  >;

  constructor() {
    this.result = initialResult();
  }
}
