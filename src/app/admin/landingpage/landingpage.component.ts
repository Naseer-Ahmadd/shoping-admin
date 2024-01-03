import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin-routing.module';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag,
    CommonModule,

    FormsModule,
    ReactiveFormsModule]
})
export class LandingpageComponent {


  slotForm: FormGroup;
  slots: any[] = []; // Assuming the slot data is an array
  showForm = false; 

  constructor(private fb: FormBuilder, private slotsService: DataService) {
    this.slotForm = this.fb.group({
      slotHeading: ['', Validators.required],
      subheading: ['', Validators.required],
      slotType: ['', Validators.required],
      sequence: ['', Validators.required],
    });

    // dragulaService.createGroup('slots', {
    //   moves: (el, container, handle) => {
    //     // Use type assertion to tell TypeScript that handle is not undefined
    //     return (handle as HTMLElement)?.classList.contains('drag-handle');
    //   },
    // });

    // // Subscribe to the 'drop' event
    // dragulaService.dropModel('slots').subscribe(({ targetModel }) => {
    //   // Handle the drop event here
    //   console.log('Dropped:', targetModel);
    // });

    
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.slots, event.previousIndex, event.currentIndex);
    this.updateSequence()
  }

  updateSequence(): void {
    this.slots.forEach((slot, index) => {
      slot.sequence = index;
    });

    // Save the updated slots back to Firestore
    this.slotsService.updateSlots(this.slots).subscribe(() => {
      console.log('Slots updated in Firestore');
    });
  }


  
  ngOnInit(): void {
    this.loadSlots()
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.slotForm.reset(); // Reset the form when hiding
    }
  }


  loadSlots(): void {
    // Call your service method to get slot data
    this.slotsService.getSlots()
      .then(slots => this.slots = slots)
      .catch(error => console.error(error));
  }

 

  onSubmit(): void {
    if (this.slotForm.valid) {
      const slotData = this.slotForm.value;

      // Call your service method to create the slot
      this.slotsService.createSlot(slotData)
        .then(response => {
          console.log(response); // Log success message
          // Optionally, you can reset the form after successful submission
          this.slotForm.reset();
        })
        .catch(error => console.error(error)); // Log error message
    }
  }

}
