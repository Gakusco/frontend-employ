import employApi from "../api/employApi";
import { QuantityOfferBusiness } from "../interface/interface";

export const quantityUserRegister = async (): Promise<number | undefined> => {
  try {
    const { status, data } = await employApi.get(
      "/statistics/quantity/applicants"
    );
    if (status === 200) {
      return data.quantityApplicants;
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      return 401;
    }
  }
};

export const quantityOfferBusiness = async (): Promise<
  QuantityOfferBusiness | number | undefined
> => {
  try {
    const { data, status } = await employApi.get<QuantityOfferBusiness>(
      "/statistics/quantity/job-offer-by-business"
    );
    if (status === 200) {
      return data;
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      return 401;
    }
  }
};
