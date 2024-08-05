import { CommonModule } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { BoxComponent } from './components/box/box.component';
import { Box, Option } from './models/model';
import { OptionsService } from './services/options.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoxComponent,RouterOutlet,
    CommonModule, RouterModule,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

cdr=inject(ChangeDetectorRef)
optionService=inject(OptionsService);

boxText= "Select Option"
selectedBox: number | null = null;
totalSum: number = 0;


boxes$: Observable<Box[]>;

options: Option[] = [
  { id:1, text: 'H', value: 1.9 },
  { id:2, text: '5.', value: 2.7 },
  { id:3, text: '--<', value: 3.8 },
  { id:4, text: '-O', value: 4.2 },
  { id:5, text: '4.', value: 4.6 },
  { id:6, text: '---', value: 6.4 },
  { id:7, text: '6.', value: 6.6 },
  { id:8, text: '-/', value: 3.2 },
  { id:9, text: '(', value: 8.8 },
  { id:10, text: '-1o', value: 9.2 },
  { id:11, text: '2--<', value: 3.6 },
  { id:12, text: '-ox', value: 6.2 },
  
];

constructor(){
  this.boxes$ = this.optionService.boxes$;
}

ngOnInit(): void {
  // Subscribe to boxes$ to calculate the initial total sum
  this.boxes$.subscribe((boxes) => this.calculateTotalSum(boxes));
}

// Select a box
selectBox(index: number): void {
  this.selectedBox = index;
}

// Select an option for the current box
selectOption(option: Option): void {
  if (this.selectedBox !== null) {
    // Update selection via the service
    this.optionService.updateSelection(this.selectedBox, option);

    // Automatically select the next box, if available
    this.selectedBox = Math.min(this.selectedBox + 1, 9);
  }
}

// Calculate total sum
calculateTotalSum(boxes: Box[]): void {
  this.totalSum = boxes.reduce((sum, box) => {
    return sum + (box.selectedOption?.value || 0);
  }, 0);
  this.totalSum = parseFloat(this.totalSum.toFixed(2)); // Format sum to two decimal places
}

// Reset selections
resetSelections(): void {
  this.optionService.resetSelections(); // Reset selections via the service
  this.selectedBox = null;
}

// Check if an option is selected in the current box
 isOptionSelected(option: Option): boolean {
  // Since we can't directly access boxes$[index], subscribe to the observable and check the selected option
  let isSelected = false;

  this.boxes$.subscribe((boxes) => {
    if (
      this.selectedBox !== null &&
      boxes[this.selectedBox]?.selectedOption?.id === option.id
    ) {
      isSelected = true;
    }
  }).unsubscribe(); // Unsubscribe immediately after getting the result to prevent memory leaks

  return isSelected;
}





}
