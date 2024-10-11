import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'users_frontend';
}
