export interface ILoginParams {
  email: string;
  password: string;
  setError: React.Dispatch<
    React.SetStateAction<{
      error: boolean;
      msg: string;
      description?: string | undefined;
    }>
  >;
}
