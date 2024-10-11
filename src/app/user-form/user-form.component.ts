import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import Swal from 'sweetalert2';
import { PasswordModule } from 'primeng/password';


// The UserFormComponent class is an Angular component that provides a form to create or edit a user.
// The component uses the UserService to create or update a user. The component uses the SweetAlert2 library to display success or error messages.
// The component uses the ActivatedRoute to get the id of the user to edit.
// The component uses the Router to navigate to the home page after creating or updating a user.
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    CardModule,
    PasswordModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
// The UserFormComponent class is an Angular component that provides a form to create or edit a user.
export class UserFormComponent {

  formUser!: FormGroup;
  IsSavingInProgress:boolean = false;
  edit:boolean = false;


  // The constructor method is an Angular class method that is called when the component is created.
  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private route: ActivatedRoute,  
    private messageService: MessageService, 
    private router: Router
  
  ) {
      this.formUser = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      position: [0, [Validators.required, Validators.min(0)]],
      status: [1]
    });
  }

  // The ngOnInit method is an Angular lifecycle hook that is called after the component is initialized.
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');    
    if(id !== 'new'){
      this.edit = true;
      this.getUsersId(+id!)
      }
    }

    // The getUsersId method fetches a user by id using the UserService.
  getUsersId(id:number) {
      this.userService.getUserById(id).subscribe({
        next:foundUser =>{
          this.formUser.patchValue(foundUser);
        },
        error:()=>{
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'User not found'
          });
          this.router.navigateByUrl('/');
        }
      })
    };

  
    // The addNewUser method creates a new user using the UserService. The method displays a success or error message using the SweetAlert2 library
    addNewUser(){
      if(this.formUser.invalid){
        Swal.fire({
          title: 'Alert',
          text: 'please fill all fields',
          icon: 'error', // 'success', 'error', 'warning', 'info', 'question'
          confirmButtonText: 'ACCEPT'
        });
        return;
      }
      this.IsSavingInProgress = true;
      this.userService.createUser(this.formUser.value).subscribe({
        next:()=>{
          Swal.fire({
            title: 'Success',
            text: 'User created',
            icon: 'success', // 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Accept'
          });
          this.IsSavingInProgress = false;
          this.router.navigateByUrl('/');
        },
        error:()=>{
          this.IsSavingInProgress = false;
          Swal.fire({
            title: 'Error',
            text: 'User not created',
            icon: 'error', // 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Accept'
          });
        }
      });
    }

    // The editUser method updates a user using the UserService. The method displays a success or error message
    editUser(){
      if(this.formUser.invalid){
       Swal.fire({
          title: 'Alert',
          text: 'please fill all fields',
          icon: 'error', // 'success', 'error', 'warning', 'info', 'question'
          confirmButtonText: 'ACCEPT'
        });
        return;
      }
      this.IsSavingInProgress = true;
      this.userService.updateUser(this.formUser.value).subscribe({
        next:()=>{
         Swal.fire({
            title: 'Success',
            text: 'User updated',
            icon: 'success', // 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Accept'
          });
          this.IsSavingInProgress = false;
          this.router.navigateByUrl('/');
        },
        error:()=>{
          this.IsSavingInProgress = false;
          Swal.fire({
            title: 'Error',
            text: 'User not updated',
            icon: 'error', // 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Accept'
          });
        }
      });
    }



  }
