import { Logger } from "tools/logger";
import { join } from "path";
const del = require("del");

export async function main(args: any, root: string, logger: Logger) {
    const clobberDir = join(root, "dist");
    logger.info("Clean ", clobberDir);
    await del(clobberDir);
    logger.info("Clean completed");
}
