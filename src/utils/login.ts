import { toast } from "react-toastify";
import { ILoginParams } from "../core/interface/ILoginParams";
import { backend } from "../envVar";
import { notify } from "./toast";

export const login = async ({ email, password, setError }: ILoginParams) => {
  try {
    await toast.promise(
      fetch(`${backend}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }),
      {
        pending: "Logging in",
        success: "Logged in successfully 👌",
        // error: "Login failed",
      }
    );

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
  } catch (error: any) {
    //error while running api
    console.error("An error occurred:", error);
    toast.dismiss();
    notify(`${error.message}`, "error");
    setError({
      error: true,
      description: "somethinh happend at the server",
      msg: "something went wrong",
    });
  }
};
