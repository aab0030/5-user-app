import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{

  users: User[] = [];


  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
  }
  ngOnInit(): void {
    this.service.findAll().subscribe( users => this.users = users);
    //Para suscribirnos a todos los eventos 
    this.addUser();
    this.removeUser();
  }

  addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.users = this.users.map( u => (u.id == user.id) ? {... user} : u)
      } else {
        this.users = [... this.users, {... user, id: new Date().getTime()}];
      }
      //Redundante?, cuando crea un usuario con el form lo rediige a la pagina de usuarios, pasandole la lista de usuarios actualizada
      this.router.navigate(['/users'], {state: { users: this.users}});
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado correctamente!",
        icon: "success"
      });
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
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
          
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{
            this.router.navigate(['/users'], {state: { users: this.users}});
          })
  
          Swal.fire({
            title: "Eliminado!",
            text: "El usuario ha sido borrado de la base de datos.",
            icon: "success"
          });
        }
      });
    })
  }

  
}
