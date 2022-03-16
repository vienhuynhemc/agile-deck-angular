import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AnswerModel } from '../../shared/answer.model';

@Component({
  selector: 'gpage-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnInit {
  @Input() isEditing?: boolean;
  @Input() deleteAnswer?: Function;
  @Input() indexAnswer?: number;
  @Input() indexAnswerTargeted?: number;
  @Input() item?: AnswerModel;
  @Input() countSelectedAnswer?: number;

  public isEnable = true;
  public isFlip: boolean = false;
  public valueTextArea = '';
  public src = '';

  private readonly destroy$ = new Subject();

  constructor() {}
  ngOnDestroy(): void {
    // this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (this.item) {
      const { type } = this.item;
      if (type == 'text') {
        this.valueTextArea = this.item.contentAsDescription!;
      } else if (type == 'img') {
        this.src = this.item.contentAsImage!;
      }
    }
  }

  onEdit(): void {
    this.isEnable = true;
  }
}
