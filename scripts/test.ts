import { Logger } from "../tools/logger";
import Jasmine = require("jasmine");
import { SpecReporter as JasminSpecReporter } from "jasmine-spec-reporter";
const pkgs = require("../lib/packages.js");

/**************************************************************
 * TODO(dmike): Create a custom istanbul jasmine spec reporter
 * Create a class that implements the jasmine.Reporter interface
 * override the jasmineDone method.
 * There use the istanbul-lib-report on the globlar.__coverage__
 * object.
 *      1. createContext
 *      2. summarize
 *      3. treeVisit
 *      4. reports from 'istanbul-reports'
 */

export async function main(args: any, root: string, logger: Logger): Promise<number> {
    const running = new Jasmine(null);
    const specReporter = new JasminSpecReporter({
        spec: {
            displayDuration: true,
        },
        suite: {
            displayNumber: true,
        },
        summary: {
            displayStacktrace: true,
            displayErrorMessages: true,
            displayDuration: true,
        },
    }) as any;

    running.addReporter(specReporter);

    const specSuffix = "*_spec.ts";
    const pakgsToTest = Object.keys(pkgs).filter((key) => args.all || args.suite === key);
    const tests: string[] = pakgsToTest.map((name) => `packages/${name}/**/${specSuffix}`);

    logger.info(`Testing packages: ${pakgsToTest}.`);

    return new Promise<number>((resolve) => {
        running.onComplete((passed: boolean) => passed ? resolve(0) : resolve(1));
        running.execute(tests);
    });
}
