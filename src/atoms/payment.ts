import { atom } from "jotai";
import type { PaymentEnum } from "../types/payments";

export const paymentAtom = atom<PaymentEnum | null>(null);
