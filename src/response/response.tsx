// Generated by https://quicktype.io

export interface JobOfferListRS {
  offerList: JobOffer[];
}

export interface JobOffer {
  createdAt: string;
  updatedAt: string;
  id: number;
  contractPeriod: string;
  requirements: string;
  salary: number;
  responsabilities: string;
  descriptionOffer: string;
  validDate: string;
  initWorkingDayTime: string;
  endWorkingDayTime: string;
  position: string;
  vacancyNumbers: number;
  enabled: boolean;
  business: Business;
}

export interface Business {
  id: number;
  name: string;
  aboutUs: string;
  email: string;
  enable: boolean;
  jobOfferList: JobOfferList[];
}
export interface JobOfferList {
  id: number;
  enabled: boolean;
}
export interface Postulant {
  id: number;
  name: string;
  lastName: string;
  credential: Credential;
  web: string;
  phoneNumber: string;
  run: string;
  email: string;
  dateOfBirth: string;
  curriculumVitae: string;
}

export interface Credential {
  id: number;
  username: string;
  password: string;
  enabled: boolean;
  roles: Role[];
}

export interface Role {
  id: number;
  role: string;
}
