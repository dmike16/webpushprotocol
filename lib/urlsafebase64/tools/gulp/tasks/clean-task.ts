const del = require('del');
import log = require('fancy-log');
import { GULP_ENV } from '@urlbase64/config';

export async function clean() {
    await del([GULP_ENV.out.root]).then((paths: string[]) => log('Elements Deleted: ', paths.join(' ')));
}
