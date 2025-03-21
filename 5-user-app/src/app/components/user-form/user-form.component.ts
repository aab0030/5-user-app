import { Component, EventEmitter} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  
  user: User;

  constructor(
    private router: Router,
    private sharingData: SharingDataService) {{

    if(this.router.getCurrentNavigation()?.extras.state) {
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    } else {
      this.user = new User();
    }
  }}

  onSubmit(userform: NgForm): void {
    if(userform.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userform.reset();
    userform.resetForm();
  }
  onClear(userform: NgForm): void{
    this.user = new User();
    userform.reset();
    userform.resetForm();
  }
}
