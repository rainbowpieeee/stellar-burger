export type TIngredient = {
  readonly amount: number;
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  readonly uid: number;
}



export type TOrder = {
  readonly name: string;
  readonly order: { number: number };
  readonly success: boolean;
}

export type TUser = {
  success: boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}


export type TFeedOrder = {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type TFeedOrdersResult = {
  success: boolean,
  total: number,
  totalToday: number,
  orders: Array<TFeedOrder>
}


/* ///https://george051191.github.io */
