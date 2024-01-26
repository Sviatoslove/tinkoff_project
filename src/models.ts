export interface ICategories {
  id: string;
  name: string;
  dataType?: string;
}

export interface IUser extends ICategories {
  icon: string;
}

export interface ICount {
  id: string;
  name: string;
  type: string;
  currency: string;
  icon: string;
  balance: string;
  userId: string;
  createdAt: string;
  dataType: string;
  bgColor: string;
  textColor: string;
}

export interface IOperation {
  id: string;
  userId: string;
  countId: string;
  name: string;
  currency: string;
  balance: string;
  createdAt: string;
  dataType: string;
  oldBalance: string
  [key:string]:string | ICategories
  // dataAction?: string
  // date?: string;
  // time?: string;
  // content?: string;
  // category?: string | ICategories;
}

export type FuncSimple = () => void;

export type EventClick = React.MouseEvent<
  HTMLButtonElement
>;

export type EventChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
