import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(email: string, password: string) {}

  register() {}

  resetpassword() {}

  logout() {}
}
