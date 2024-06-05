export type TUserType = 'super' | 'admin' | 'driver';

export type TUser = {
  _id: string;
  name: string;
  username: string;
  type: TUserType;
  createdAt: string;
  phoneNumber: string;
};

export type TPostUser = Omit<TUser, '_id' | 'createdAt'> & {
  password: string;
};

export const userTypeMap = {
  super: 'super usuario',
  admin: 'administrador',
  driver: 'chofer',
};

// "super":  "super",
// 	"admin":  "admin",
// "driver": "driver",
