// import { Component } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import 'zone.js';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   template: `
//     <h1>Hello from {{ name }}!</h1>
//     <a target="_blank" href="https://angular.dev/overview">
//       Learn more about Angular
//     </a>
//   `,
// })
// export class App1 {
//   name = 'Angular';
// }

// bootstrapApplication(App1);

 //import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef, NgZone } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
// .then((appRef: ApplicationRef) => {
//   // Manually run change detection after bootstrapping
//   appRef.tick();
// })
// .then(appRef => {
//   const ngZone = appRef.injector.get(NgZone);

//   // Ensure initial change detection
//   ngZone.run(() => {
//     const applicationRef = appRef.injector.get(ApplicationRef);
//     // Trigger an initial tick to update the UI
//     applicationRef.tick();
//   });
// })
// .then(appRef => {
//   const ngZone = appRef.injector.get(NgZone);

//   // Ensure initial change detection without zone.js
//   ngZone.run(() => {
//     // Obtain a reference to the ApplicationRef
//     const applicationRef = appRef.injector.get(ApplicationRef);

//     // Trigger an initial tick to update the UI
//     applicationRef.tick();
//   });
// })
// bootstrapApplication(AppComponent, appConfig)
// .then(appRef => {
//   const applicationRef = appRef.injector.get(ApplicationRef);
//   applicationRef.tick(); // Ensure initial change detection
// })
  
.catch((err) => console.error(err));
