interface IEnv {
  VITE_API_URL: string;
}

const getEnv = (key: keyof IEnv): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    // console.log(`Environment variable ${key} is not defined`);
  }
  return value ?? '';
};

const env: IEnv = {
  VITE_API_URL: getEnv('VITE_API_URL'),
};

export default env;
