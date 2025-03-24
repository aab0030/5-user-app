import { Component, EventEmitter, OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{
  
  user: User;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService) {
      this.user = new User();

  }
  ngOnInit(): void {

    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);

    // Capturar el parametro que nos pasan por la ruta
    this.route.paramMap.subscribe(params => {
      const id: number = parseInt(params.get('id') || '0');
      if (id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);   
      }
    })
  }

  onSubmit(userform: NgForm): void {
    if(userform.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
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
