import { ReactNode } from "react";

export type TErrorText = {
  readonly text: string;
};

export type TModalOverlay = {
  children: ReactNode;
  onClose: () => void;
};

export type TModal = {
  title?: string;
} & TModalOverlay;

export type TOrderDetails = {
  readonly order: number;
};

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: TIngredientType;
  readonly __v: number;
  readonly _id: string;
  readonly qty?: number | undefined | null;
  index?: number;
};

export type TIngredientWithUniqKey = TIngredient & {
  readonly uuid: string;
};

export type TIngredientList = {
  readonly list: ReadonlyArray<TIngredient>;
  readonly typeCard: TIngredientType;
  readonly title: string;
};

export type TOrderSuccess = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TIngredientType = "main" | "sauce" | "bun";

export type TConstructorItem = {
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  id: string;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TRegisterResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  accessToken: string;
  refreshToken: string;
};

export type TLoginResponse = TRegisterResponse;

export type TProfileResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TUpdateProfileRq = {
  email: string;
  password: string;
  name: string;
};

export type TGetCodeForResetPassRQ = {
  email: string;
};

export type TGetCodeForResetPassResponse = {
  success: boolean;
  message: string;
};

export type TConfirmResetPassRQ = {
  password: string;
  token: string;
};

export type TConfirmResetPassResponse = {
  success: boolean;
  message: string;
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TUser = TRegisterResponse & {
  registerInfo: {
    request: boolean;
    failedRequest: boolean;
    success: boolean;
  };
  codePasswordInfo: TGetCodeForResetPassResponse & {
    request: boolean;
    failedRequest: boolean;
  };
  confirmResetPass: TConfirmResetPassResponse & {
    request: boolean;
    failedRequest: boolean;
  };
  loginInfo: {
    request: boolean;
    failedRequest: boolean;
    success: boolean;
  };
  getProfileInfo: {
    request: boolean;
    failedRequest: boolean;
    success: boolean;
  };
  logoutInfo: TLogoutResponse & {
    request: boolean;
    failedRequest: boolean;
  };
};

export type TWsActions = {
  wsInit: any;
  wsClose: any;
  onOpen: any;
  onClose: any;
  onError: any;
  onMessage: any;
  wsSendMessage?: any;
};
