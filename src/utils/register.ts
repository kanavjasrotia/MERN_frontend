import { ERole } from "../core/enum/Erole";
import { IRegister } from "../core/interface/IRegister";
import { IRegisterParams } from "../core/interface/IRegisterParams";
import { backend } from "../envVar";

export const register = async ({ formData, setError }: IRegisterParams) => {
  console.log(formData);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const name = formData.get("name") as string;

  //SET ISSHOP VAR =TRUE IF ISSHOP CHECKBOX IS ON
  const isShop: boolean = formData.get("isShop") === "on" ? true : false;

  //SET OWNERNAME FROM IF ISSOP IS CHECKED
  let ownerName: string | undefined = undefined;
  isShop === true
    ? (ownerName = formData.get("ownerName") as string)
    : undefined;

  //SET DEFAULT ROLE AS USER AND SHOP IS SHOP CHECKBOX IS CHECKED
  let role = ERole.User;
  isShop ? (role = ERole.Shop) : (role = role);

  //SETTING UP API DATA BODY
  const requestBody: IRegister = {
    name,
    email,
    password,
    confirmPassword,
    role,
    ownerName,
  };
  try {
    //CALL REGISTER API
    const response = await fetch(`${backend}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    //GETTING RESPONSE FROM PROMISE
    const res = await response.json();

    //RETURNING IF API IS SUCCESS BUT REGISTERING FAILED
    if (!res.success) {
      return setError({
        error: true,
        msg: res.msg || res.errors[0].msg,
        description: res.description,
      });
    }

    //SEETIN ERROR AS NULL IF REGISTER IS SUCCESS
    setError({ error: false, msg: "", description: "" });

    if (res.success) {
      return res.success;
      // navigate("/");
    }
    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
    setError({
      error: true,
      description: "somethinh happend at the server",
      msg: "something went wronf",
    });
  }
};
