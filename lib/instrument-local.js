const { createInstrumenter } = require('istanbul-lib-instrument');
let replaceSourceMap = false;
const instrumentOpts = {
    esModules: true, produceSourceMap: true, sourceMapUrlCallback: () => {
        replaceSourceMap = true;
    },
};

exports.hook = function (code, filename) {
    // Skip spec files.
    if (filename.match(/_spec(_large)?\.ts$/)) {
        return code;
    }
    const instrument = createInstrumenter(instrumentOpts);
    let instrumentedCode = instrument.instrumentSync(code, filename);
    if (replaceSourceMap) {
        replaceSourceMap = false;
        instrumentedCode = `${instrumentedCode} //# sourceMappingURL=data:application/json;base64,${Buffer.from(JSON.stringify(instrument.lastSourceMap())).toString('base64')}`;
    }
    return instrumentedCode;
};
