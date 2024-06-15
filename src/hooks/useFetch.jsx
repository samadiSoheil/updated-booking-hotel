import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useFetch = (url, query) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchingData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        toast.error(error.response.request.statusText);
      } finally {
        setIsLoading(false);
      }
    }
    fetchingData();
  }, [query]);

  return { data, isLoading };
};

export default useFetch;
