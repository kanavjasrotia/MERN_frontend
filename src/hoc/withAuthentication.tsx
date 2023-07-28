import { EffectCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { decodeToken } from "../utils/decodeToken";
import useJwtExpirationCheck from "../hooks/useTokenExpirationCheck";
import { ERole } from "../core/enum/Erole";
import { IDecodedToken } from "../core/interface/IDecodedToken";
import { notify } from "../utils/toast";
import { toast } from "react-toastify";

const withAuth = (
  WrappedComponent: React.ElementType,
  userRole: ERole.User | ERole.Shop
) => {
  const ModifiedComp = (): any => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isTokenValid, checkTokenExpiration } = useJwtExpirationCheck();

    useEffect(() => {
      const fetch = async () => {
        await checkTokenExpiration();
      };

      fetch();
      let decoded: any = decodeToken();
      let data: IDecodedToken = decoded.data;
      if (data.role !== userRole) {
        toast.dismiss();
        notify("you are not authorised to access the path", "error");
        navigate("/");
      }
    }, []);

    useEffect(() => {
      if (isTokenValid !== undefined && !isTokenValid) {
        navigate("/login");
        localStorage.clear();
      }
      console.log(isTokenValid);
    }, [isTokenValid]);

    if (isTokenValid) {
      return <WrappedComponent />;
    } else if (isLoading || !isTokenValid) {
      return <Spinner animation="border" size="sm" variant="success" />;
    }
  };

  return ModifiedComp;
};

export default withAuth;
