import { Injectable } from '@angular/core';
import { Box, Option } from '../models/model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private readonly storageKey = 'selectedBoxes'; // Key for Local Storage

  // Initialize boxes with default values or from Local Storage
  private boxes: Box[] = this.loadFromLocalStorage() || this.initializeBoxes();

  // BehaviorSubject to manage the state of boxes
  private boxesSubject: BehaviorSubject<Box[]> = new BehaviorSubject<Box[]>(this.boxes);

  // Observable for boxes, which components can subscribe to
  boxes$: Observable<Box[]> = this.boxesSubject.asObservable();

  constructor() {}

  // Initialize boxes with a default configuration
  private initializeBoxes(): Box[] {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index,
      selectedOption: undefined
    }));
  }

  // Method to update the selection of an option for a given box
  updateSelection(boxIndex: number, selectedOption: Option | undefined): void {
    // Update the box with the new selected option
    const updatedBoxes = this.boxes.map((box, index) =>
      index === boxIndex ? { ...box, selectedOption } : box
    );

    // Update the boxes state, persist to Local Storage, and notify subscribers
    this.boxes = updatedBoxes;
    this.saveToLocalStorage();
    this.boxesSubject.next(this.boxes);
  }

  // Method to reset all selections
  resetSelections(): void {
    // Clear the selectedOption for each box
    const resetBoxes = this.boxes.map((box) => ({
      ...box,
      selectedOption: undefined,
    }));

    // Update the boxes state, persist to Local Storage, and notify subscribers
    this.boxes = resetBoxes;
    this.saveToLocalStorage();
    this.boxesSubject.next(this.boxes);
  }

  // Load boxes state from Local Storage
  private loadFromLocalStorage(): Box[] | null {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  // Save boxes state to Local Storage
  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.boxes));
  }
}
