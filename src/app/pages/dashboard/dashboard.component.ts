import { Component, inject } from '@angular/core';
import { AuthStore } from '../../state/auth.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authStore = inject(AuthStore);

}
