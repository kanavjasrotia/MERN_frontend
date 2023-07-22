import { useState } from "react";
import axios from "axios";
import { backend } from "../envVar";

const useJwtExpirationCheck = () => {
  const token = localStorage.getItem("token") as string;
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>();
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenExpiration = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${backend}/verifyToken`,
        data: {
          token: token,
        },
      });
      const res = await response.data;
      console.log(res);
      setIsTokenValid(response.data.success);
    } catch (error) {
      setIsTokenValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isTokenValid, isLoading, checkTokenExpiration };
};

export default useJwtExpirationCheck;
