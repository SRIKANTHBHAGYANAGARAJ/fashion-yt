import type { Address, CartLine } from "./domain";

export type CheckoutPayload = {
  address: Address;
  notes?: string;
  couponCode?: string;
  paymentMethod: "stripe" | "cod";
  lines: CartLine[];
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};
