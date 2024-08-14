import { useEffect, useState } from "react";

const useLoginStatus = () => {
  const [loginStatus, setLoginStatus] = useState();

  useEffect(() => {
    const userStatus = JSON.parse(
      sessionStorage.getItem("userStatus") || "false"
    );

    setLoginStatus(userStatus);
  }, []);

  return { loginStatus };
};

export default useLoginStatus;
