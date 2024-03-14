import { useEffect, useState } from "react";
import { getUserHodlings } from "../apis/api";
import { Holding } from "../types/holdingTypes";
import axios from "axios";

export const useGetUserHoldings = () => {
  const [isLoading, setIsLoaidng] = useState(false);
  const [error, setError] = useState(false);
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    fetchUserHoldings();
  }, []);

  const reload = () => {
    fetchUserHoldings();
  };

  const fetchUserHoldings = async () => {
    setIsLoaidng(true);
    setError(false);
    const data = await getUserHodlings();
    if (axios.isAxiosError(data)) {
      setError(true);
    } else {
      if (data && data.userHolding) {
        setHoldings(data.userHolding);
      }
    }
    setIsLoaidng(false);
  };

  return { isLoading, holdings, error, reload };
};
