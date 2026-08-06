import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, RegisterResponse } from 'src/app/models/api.model';
import { registerPayload } from 'src/app/models/auth.model';
import { ApiService } from '../apiService/api-service';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private api: ApiService) {}
  isAuthenticated = signal<boolean>(false);
  login(email: string, password: string) {}

  register(
    payload: registerPayload,
  ): Observable<ApiResponse<RegisterResponse>> {
    return this.api.post('register', payload);
  }

  resetpassword() {}

  logout() {}
}
