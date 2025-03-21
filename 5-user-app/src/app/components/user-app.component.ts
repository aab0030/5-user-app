import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{
  title: string = 'Listado de usuarios';

  users: User[] = [];

  userSelected: User;

  open: boolean = false;

  constructor(private service: UserService) {
    this.userSelected = new User;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe( users => this.users = users);
  }

  addUser(user: User){
    if (user.id > 0) {
      this.users = this.users.map( u => (u.id == user.id) ? {... user} : u)
    } else {
      this.users = [... this.users, {... user, id: new Date().getTime()}];
    }
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado correctamente!",
      icon: "success"
    });
    this.userSelected = new User();
  }

  removeUser(id: number): void {
    Swal.fire({
      title: "Seguro que quieres borrarlo?",
      text: "Esta acción es permanente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí!",
      cancelButtonText: "No!",
    }).then((result) => {
      if (result.isConfirmed) {

        this.users = this.users.filter((user) => user.id != id);

        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido borrado de la base de datos.",
          icon: "success"
        });
      }
    });

  }

  setSelectedUser(user: User): void {
    this.userSelected = {... user};
    this.open = true;
  }

  setOpen() {
    this.open = !this.open;
  }
}
