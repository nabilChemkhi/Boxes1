import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Box } from '../../models/model';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  @Input() box!: Box;
  @Input() isSelected!: boolean;
  @Output() selectBox = new EventEmitter<void>();

  onSelectBox(): void {
    this.selectBox.emit();
  }

}
