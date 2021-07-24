

export interface OfferJobRQ {
  contractPeriod:     string;
  requirements:       string;
  salary:             number;
  responsabilities:   string;
  descriptionOffer:   string;
  validDate:          string;
  initWorkingDayTime: string;
  endWorkingDayTime:  string;
  position:           string;
  vacancyNumbers:     number;
}

export interface OfferJobUpdateRQ {
  id: number;
  contractPeriod:     string;
  requirements:       string;
  salary:             number;
  responsabilities:   string;
  descriptionOffer:   string;
  validDate:          string;
  initWorkingDayTime: string;
  endWorkingDayTime:  string;
  position:           string;
  vacancyNumbers:     number;
}
