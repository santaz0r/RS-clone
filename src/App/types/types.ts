type TSpec = {
  [key: string]: string | number;
};

type TDoc = {
  name: string;
  password: string;
  specialization: string;
  mail: string;
  username: string;
  image: string;
  surname: string;
  _id: string;
};

type TSession = {
  _id: string;
  doctorId: string;
  clientId: string;
  date: string;
};

export type { TSpec, TDoc, TSession };
