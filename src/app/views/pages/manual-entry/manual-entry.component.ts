import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import{ Filer }

interface Step {
  title: string;
  subtitle: string;
  completed: boolean;
}

@Component({
  selector: 'app-manual-entry',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './manual-entry.component.html',
  styleUrl: './manual-entry.component.scss'
})
export class ManualEntryComponent {

  steps: Step[] = [
    { title: 'Filer', subtitle: 'Choose who is filing', completed: false },
    { title: 'Form and year', subtitle: 'Choose tax year and form', completed: false },
    { title: 'Recipients', subtitle: 'Choose who gets a form', completed: false },
    { title: 'Form details', subtitle: 'Enter box amounts', completed: false },
    { title: 'Review', subtitle: 'Check and add to cart', completed: false }
  ];

  currentStepIndex = 0;

  goToStep(index: number) {
    if (index <= this.currentStepIndex || this.steps[index - 1]?.completed) {
      this.currentStepIndex = index;
    }
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.steps[this.currentStepIndex].completed = true;
      this.currentStepIndex++;
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

}
