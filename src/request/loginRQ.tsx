export interface LoginRQ {
  username: string;
  password: string;
}

export interface RegisterRQ {
  name: string;
  lastName: string;
  web: string;
  email: string;
  phoneNumber: string;
  run: string;
  dateOfBirth: string;
  curriculumVitae: string;
  credential: CredentialsRQ;
}

interface CredentialsRQ {
  username: string;
  password: string;
}