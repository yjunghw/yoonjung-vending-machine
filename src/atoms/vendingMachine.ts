import { atom } from "jotai";
import type { PaymentEnum } from "../types/payments";
import type { Beverage } from "../types/display";

export const paymentAtom = atom<PaymentEnum | null>(null);
export const totalAtom = atom(0);

export const beveragesAtom = atom<Beverage[]>([]);
