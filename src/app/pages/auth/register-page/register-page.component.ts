import {CommonModule} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  fields: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.fields = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit = () => {
    const user = this.authService.register(this.fields.value);
    if (user) {
      this.notificationService.success('Account created successfully');
      this.router.navigate(['/app/auth/login']);
    } else {
      this.notificationService.error('Error creating account');
    }
  }

  ngOnInit(): void {

  }
}
