import { atom } from "jotai";
import type { Beverage } from "../types/display";

export const beveragesAtom = atom<Beverage[]>([]);
