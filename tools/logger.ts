export interface Logger {
    error: (...txt: string[]) => void;
    warn: (...txt: string[]) => void;
    info: (...txt: string[]) => void;
}
