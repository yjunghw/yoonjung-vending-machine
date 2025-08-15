import { atom } from "jotai";
import type { PaymentEnum } from "../types/payments";

export const paymentAtom = atom<PaymentEnum | null>(null);
export const totalAtom = atom(0);
