export interface IRegisterParams {
  formData: FormData;
  setError: React.Dispatch<
    React.SetStateAction<{
      error: boolean;
      msg: string;
      description?: string | undefined;
    }>
  >;
}
