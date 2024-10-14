import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { User } from '../interfaces/users';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';


// The HomeComponent class is an Angular component that displays a list of users in a table. 
// The component uses the UserService to fetch the users from the server. 
// The component also provides a button to delete a user. The component uses the SweetAlert2 library to display a confirmation dialog before deleting a user.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule, RouterModule, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


// The HomeComponent class is an Angular component that displays a list of users in a table.
export class HomeComponent {

  users:User[] = []
  positions = ['Admin', 'User']
  deleteInprogress:boolean = false;

  constructor(private userService: UserService, private messageService:MessageService) {}

  // The ngOnInit method is an Angular lifecycle hook that is called after the component is initialized.
  ngOnInit(): void {
    this.getAllUsers()
  }

// The getAllUsers method fetches all users from the server using the UserService.
  getAllUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
        this.users = data;
      });
  }

  // The deleteUser method deletes a user by id using the UserService. The method displays a confirmation dialog before deleting the user.
  deleteUser(id:number){
    this.deleteInprogress = true;
    console.log(id);
    if(id){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe({
            next:()=>{
              Swal.fire('User Deleted', 'User has been deleted successfully', 'success');
              this.deleteInprogress = false;
              this.getAllUsers();
            },
            error:()=>{
              Swal.fire('User Deleted', 'User has been deleted successfully', 'success');
              this.deleteInprogress = false;
              this.getAllUsers();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'User is safe :)', 'error');
        }
      })
    }
  }

}
