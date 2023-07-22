import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import useJwtExpirationCheck from "../hooks/useTokenExpirationCheck";

const withAuth = (WrappedComponent: React.ElementType) => {
  const ModifiedComp = (props: { name: string }): any => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isTokenValid, checkTokenExpiration } = useJwtExpirationCheck();

    useEffect(() => {
      checkTokenExpiration();
    }, []);

    useEffect(() => {
      if (isTokenValid !== undefined && !isTokenValid) {
        navigate("/login");
        localStorage.clear();
      }
      console.log(isTokenValid);
    }, [isTokenValid]);

    if (isTokenValid) {
      return <WrappedComponent {...props} />;
    } else if (isLoading || !isTokenValid) {
      return <Spinner animation="border" size="sm" variant="success" />;
    }
  };

  return ModifiedComp;
};

export default withAuth;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useJwtExpirationCheck from "../hooks/useTokenExpirationCheck";

// interface AuthWrapperProps {}

// const withAuth = <P extends AuthWrapperProps>(
//   WrappedComponent: React.ComponentType<P>
// ) => {
//   return function AuthWrapper(props: P) {
//     const { isTokenValid, checkTokenExpiration } = useJwtExpirationCheck();

//     useEffect(() => {
//       checkTokenExpiration();
//     }, []);

//     return isTokenValid ? <WrappedComponent {...props} /> : null;
//   };
// };

// export default withAuth;
