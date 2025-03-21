import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  
  @Input() user: User;

  @Output() openEventEmitter = new EventEmitter();

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() {{
    this.user = new User();
  }}

  onSubmit(userform: NgForm): void {
    if(userform.valid) {
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userform.reset();
    userform.resetForm();
    this.onOpenClose();
  }
  onClear(userform: NgForm): void{
    this.user = new User();
    userform.reset();
    userform.resetForm();
  }

  onOpenClose(): void {
    this.openEventEmitter.emit();
  }
}
