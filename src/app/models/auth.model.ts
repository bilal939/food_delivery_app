type gender = 'male' | 'female' | 'other';
export interface registerPayload {
  name: string;
  email: string;
  dob: Date;
  password: string;
  gender: gender;
}
