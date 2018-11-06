export interface Logger {
    error: (...txt: any[]) => void;
    warn: (...txt: any[]) => void;
    info: (...txt: any[]) => void;
}
