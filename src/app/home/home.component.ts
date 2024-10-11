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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule, RouterModule, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})




export class HomeComponent {

  users:User[] = []
  positions = ['Admin', 'User']
  deleteInprogress:boolean = false;

  constructor(private userService: UserService, private messageService:MessageService) {}

  
  ngOnInit(): void {
    this.getAllUsers()
  }


  getAllUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
        this.users = data;
      });
  }

  
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
              this.deleteInprogress = false;
              Swal.fire('Error', 'An error occured while deleting user', 'error');
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'User is safe :)', 'error');
        }
      })
    }
  }

}
