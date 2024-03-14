import axios from "axios";
import { GET_HOLDINGS_ENDPOINT } from "../constants/apiConstants";

const status = [200, 301, 201, 204];

export const checkApiSuccessStatus = (responseStatus) => {
  return !!status.length && status.includes(responseStatus);
};

export const getUserHodlings = async () => {
  const endpoint = GET_HOLDINGS_ENDPOINT;
  try {
    const response = await axios.get(endpoint);
    if (checkApiSuccessStatus(response.status)) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
