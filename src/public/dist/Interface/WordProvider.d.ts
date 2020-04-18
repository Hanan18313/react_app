import { NumPack } from "./NumPack";
export interface WordProvider {
    GetWordValue(word: string, numPack: NumPack): boolean;
}
