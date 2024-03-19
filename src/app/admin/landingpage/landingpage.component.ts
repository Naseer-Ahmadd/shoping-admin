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
  allCategories: any = [];
  catSelected:any={}

  slotForm: FormGroup;
  slots: any[] = []; // Assuming the slot data is an array
  showForm = false; 
   
  constructor(private fb: FormBuilder, private slotsService: DataService,private dataService: DataService) {
    this.slotForm = this.fb.group({
      slotHeading: ['', Validators.required],
      subheading: ['', Validators.required],
      slotType: ['', Validators.required],
      sequence: ['', Validators.required],
      mainCategoryID: ['', Validators.required],
      subCategoryID: ['', Validators.required],
    });



    
  }

  onMainCategoryChange(event:any){
    const selectedIndex = event.target.selectedIndex;
    this.catSelected=this.allCategories[selectedIndex]
    
  }
  


  getAllCategories() {
    this.dataService
      .getCategories()
      .then((categories) => {
        this.allCategories = categories;
       // console.log('this.allCategories :', this.allCategories);
        // Handle the retrieved categories here
      })
      .catch((error: any) => {
        console.error('Error getting categories:', error);
        // Handle the error here
      });
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
    this.getAllCategories()
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
    console.log(this.slotForm)
    if (this.slotForm.valid || true) {
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
function getAllCategories() {
  throw new Error('Function not implemented.');
}

