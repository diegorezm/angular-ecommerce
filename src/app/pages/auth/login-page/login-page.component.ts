import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  fields: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private notificationService: NotificationService, private router: Router) {
    this.fields = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit = () => {
    const user = this.authService.login(this.fields.value);
    if (user) {
      this.notificationService.success('Login successful');
      this.router.navigate(['/app/products']);
    } else {
      this.notificationService.error('Invalid credentials');
    }
  }

}
