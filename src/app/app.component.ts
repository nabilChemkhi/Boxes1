import { CommonModule } from '@angular/common';
import { ApplicationRef, ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
title = 'Boxes';
cdr=inject(ChangeDetectorRef)

 
 constructor() {}

 ngOnInit() {
   // Simulating an async operation
   setTimeout(() => {
     this.title = 'Data loaded';
     
     // Manually trigger change detection
     //this.cdr.detectChanges();
     this.cdr.markForCheck();
   }, 2000);
 }

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
