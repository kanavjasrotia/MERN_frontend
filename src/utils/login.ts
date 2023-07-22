import { ILoginParams } from "../core/interface/ILoginParams";
import { backend } from "../envVar";

export const login = async ({ email, password, setError }: ILoginParams) => {
  try {
    const response = await fetch(`${backend}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await response.json();
    console.log(res);
    //set ls vars
    if (res.success === true) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", res.email);
      localStorage.setItem("id", res.id);
      localStorage.setItem("role", res.role);
    }

    //if api is success but some error
    if (!res.success) {
      return setError({
        error: true,
        msg: res.msg || res.errors[0].msg,
        description: res.description,
      });
    }

    //api runs and no error
    if (res.success) {
      setError({ error: false, msg: "", description: "" });
      return res.success;
    }
  } catch (error) {
    //error while running api
    console.error("An error occurred:", error);
    setError({
      error: true,
      description: "somethinh happend at the server",
      msg: "something went wronf",
    });
  }
};
