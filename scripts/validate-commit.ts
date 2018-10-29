import { Logger } from "../tools/logger";
import { CommitMsgValidator } from "../tools/process/git/commit-msg-validate";

export async function main(args: any, root: string, logger: Logger): Promise<number> {
    const engine = new CommitMsgValidator(process.env["HUSKY_GIT_PARAMS"], logger);

    const isValid = await engine.validate().toPromise();

    return isValid ? 0 : 2;
}
