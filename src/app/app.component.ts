import { CommonModule } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { BoxComponent } from './components/box/box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoxComponent,
    CommonModule, RouterModule,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
//title = 'Boxes';
//cdr=inject(ChangeDetectorRef)

boxText= "Select Option"


boxes = Array.from({ length: 10 }, (_, i) => `Box ${i + 1}`);

// Hardcoded array of options with associated values
options = Array.from({ length: 5 }, (_, i) => ({
  text: `Option ${i + 1}`,
  value: i + 10.3, // Example associated value
}));

// State to keep track of selected options and the selected box
selectedOptions: ({ text: string; value: number } | null)[] = Array(10).fill(null);
selectedBox: number | null = null;

// Handler to update the selected box
selectBox(index: number) {
  this.selectedBox = index;
}

// Handler to update the selected option
selectOption(option: { text: string; value: number }) {
  if (this.selectedBox !== null) {
    this.selectedOptions[this.selectedBox] = option;

    // Automatically select the next box if it's not the last one
    if (this.selectedBox < this.boxes.length - 1) {
      this.selectedBox++;
    }
    this.calculateTotalSum(); // Recalculate the sum

  }
  
}

// Helper to check if an option is selected for the current box
isOptionSelected(option: { text: string; value: number }): boolean {
  return (
    this.selectedBox !== null &&
    this.selectedOptions[this.selectedBox]?.text === option.text
  );
}

// // Calculate the total sum of all selected options' values
// get totalSum(): number {
//   return this.selectedOptions.reduce((sum, option) => sum + (option?.value || 0), 0);
// }

totalSum: number = 0;

// Method to calculate the total sum and ensure two decimal places
calculateTotalSum() {
  this.totalSum = this.boxes.reduce((sum, box, i) => {
    const value = this.selectedOptions[i]?.value || 0;
    return sum + value;
  }, 0);

  // Format to two decimal places
  this.totalSum = parseFloat(this.totalSum.toFixed(2));
}

 // Reset all selections and set the total sum to zero
 resetSelections() {
  this.selectedOptions.fill(null);
  this.selectedBox = null;

  this.calculateTotalSum(); // Recalculate the sum

}
 
//  constructor() {}

//  ngOnInit() {
//    // Simulating an async operation
//    setTimeout(() => {
//      this.title = 'Data loaded';
     
//      // Manually trigger change detection
//      //this.cdr.detectChanges();
//      this.cdr.markForCheck();
//    }, 2000);
//  }

// constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

//   ngOnInit() {
//     console.log('Component initialized');

//     // Simulate an async operation
//     this.ngZone.runOutsideAngular(() => {
//       setTimeout(() => {
//         this.title = 'Data loaded';

//         // Ensure change detection runs
//         this.ngZone.run(() => {
//           this.cdr.detectChanges(); // Manually trigger change detection
//         });
//       }, 2000);
//     });
//   }

}
