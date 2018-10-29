import { Logger } from "../tools/logger";
import { CommitMsgValidator } from "../tools/process/git/commit-msg";

export async function main(args: any, root: string, logger: Logger): Promise<number> {
    // tslint:disable-next-line:no-string-literal
    const engine = new CommitMsgValidator(process.env["GIT_PARAMS"], logger);

    const isValid = await engine.validate().toPromise();

    return isValid ? 0 : 11;
}
