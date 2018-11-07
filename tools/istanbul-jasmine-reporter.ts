const libReport = require("istanbul-lib-report");
const reports = require("istanbul-reports");
const libCoverage = require("istanbul-lib-coverage");
/**************************************************************
 * Create a custom istanbul jasmine spec reporter
 * Create a class that implements the jasmine.Reporter interface
 * override the jasmineDone method.
 * There use the istanbul-lib-report on the globlar.__coverage__
 * object.
 *      1. createContext
 *      2. summarize
 *      3. treeVisit
 *      4. reports from 'istanbul-reports'
 */
export class IstanbulJasmineReporter implements jasmine.CustomReporter {
    constructor(private reportDir: string, private reporters: string[]) { }

    jasmineDone(suiteInfo: jasmine.RunDetails) {
        if ((global as any).__coverage__) {
            const map = libCoverage.createCoverageMap((global as any).__coverage__);
            const context = libReport.createContext({
                dir: this.reportDir,
            });
            const tree = libReport.summarizers.pkg(map);
            this.reporters.forEach((reporter) => {
                tree.visit(reports.create(reporter), context);
            });
        }
    }
}
