import { Logger } from "../tools/logger";
import Jasmine = require("jasmine");
import { SpecReporter as JasminSpecReporter } from "jasmine-spec-reporter";
import { IstanbulJasmineReporter } from "../tools/istanbul-jasmine-reporter";
import { resolve } from "path";
const pkgs = require("../lib/packages.js");

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
    running.addReporter(new IstanbulJasmineReporter(resolve(__dirname, "..", "coverage"), ["json", "html"]) as any);

    const specSuffix = "*_spec.ts";
    const pakgsToTest = Object.keys(pkgs).filter((key) => args.all || args.suite === key);
    const tests: string[] = pakgsToTest.map((name) => `packages/${name}/**/${specSuffix}`);

    logger.info(`Testing packages: ${pakgsToTest}.`);

    return new Promise<number>((res) => {
        running.onComplete((passed: boolean) => passed ? res(0) : res(1));
        running.execute(tests);
    });
}
