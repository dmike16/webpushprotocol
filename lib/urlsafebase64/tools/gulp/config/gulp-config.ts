export const GULP_ENV: { [key: string]: any } = {
    tsconfig: 'tsconfig.json',
    out: {
        root: 'build',
        get umd() {
            return `${this.root}/out`
        },
        get es2015() {
            return `${this.root}/out-es2015`
        },
        get cmj() {
            return `${this.root}/out-cmj`
        }
    }
};
