import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  DatetimeCustomEvent,
  IonButton,
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { AuthheaderComponent } from 'src/app/components/authheader/authheader.component';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  checkmarkOutline,
  eye,
  eyeOffOutline,
  key,
  mail,
  maleFemaleOutline,
  person,
} from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Auth } from 'src/app/services/auth/auth';
import { ToastService } from 'src/app/services/toast/toast-service';
import { finalize } from 'rxjs';

// Cross-field validator: confirmPassword must match password
function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthheaderComponent,
    IonItem,
    IonIcon,
    IonText,
    IonInput,
    RouterLink,
    IonInputPasswordToggle,
    IonButton,
    IonModal,
    IonDatetime,
    IonSpinner,
    IonList,
    IonLabel,
  ],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  // prevents picking a future date of birth
  maxDate = new Date().toISOString();

  constructor(
    private fb: FormBuilder,
    private authservice: Auth,
    private toast: ToastService,
  ) {
    addIcons({
      person,
      mail,
      key,
      eye,
      eyeOffOutline,
      calendarOutline,
      maleFemaleOutline,
      checkmarkOutline,
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() },
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onDateChange(event: DatetimeCustomEvent, dobModal: IonModal): void {
    this.registerForm.patchValue({ dob: event.detail.value });
    this.registerForm.get('dob')?.markAsTouched();
    dobModal.dismiss();
  }

  selectGender(value: string, sheetModal: IonModal): void {
    this.registerForm.patchValue({ gender: value });
    this.registerForm.get('gender')?.markAsTouched();
    sheetModal.dismiss();
  }

  formattedDob(): string {
    const dob = this.registerForm.get('dob')?.value;
    if (!dob) return '';
    return new Date(dob).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  formattedGender(): string {
    const gender = this.registerForm.get('gender')?.value;
    return this.genderOptions.find((g) => g.value === gender)?.label ?? '';
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authservice
      .register(this.registerForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.toast.success(res.message);
          }
        },
        error: (err: unknown | any) => {
          this.toast.error(
            err.error?.message || err?.error?.error || 'Registration Failed',
          );
        },
      });
  }
}
