import { Logger } from "../tools/logger";
const pkg = require("../package.json");

export async function main(args: any, root: string, logger: Logger): Promise<number> {
    const scriptAvailable: string[] = Object.keys(pkg.scripts)
        .map<any>((key) => `#    ${key}: ${pkg["scripts-info"][key]}`);
    logger.info(`
    #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#
    #
    # Name             ${pkg.name}
    # Description      ${pkg.description}
    # Author           ${pkg.author}
    # Repo             ${pkg.repository.url}
    # Licence          ${pkg.licence}
    #
    #
    #  .ABSTRACT.
    # This a private repo for managing the build of webpush lib plus all its
    # dependecies.
    #
    #   .ONLY FOR DEVELOPERS.
    # Available scripts, to run with 'npm run <scriptName>' or 'yarn run <scriptName>'
    ${scriptAvailable.join("\n    ")}
    #
    #   .COMMIT GUIDELINE.
    # All commit should follow the below template:
    # <type>(<scope>): <subject>
    # <BLANK LINE>
    # <body?>
    # <BLANK LINE>
    # <footer?>
    #
    #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#`);
    return 0;
}
