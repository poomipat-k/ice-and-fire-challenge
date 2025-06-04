import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-com-input-text',
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  control = input.required<FormControl>();
  placeholder = input<string>('Search for name');
  isPassword = input(false);
  width = input('100%');
  height = input('42px');
  margin = input('0');
  fontSize = input('16px');
}
