import { Logger } from "../tools/logger";
import { minimalCompiler } from "../tools/process/ts/minimal-compiler";
import { join, relative } from "path";

export async function main(args: any, root: string, logger: Logger): Promise<number> {
    logger.info("Building all repo....");
    const packages = require("../lib/packages");
    const files = Object.values<{ root: string; main: string; }>(packages).map((pkg) => relative(root, pkg.main));
    // logger.info(...files);
    await minimalCompiler(join(root, "tsconfig.json"), files);
    logger.info("Building End....");
    return 0;
}
