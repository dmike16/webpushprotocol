
import createUrlsafeBase64, { UrlsafeBase64, Urlbase64Mode } from "urlsafebase64";

declare function expect(...args: any): any;

/**
 * @test {UrlsafeBase64}
 */
describe("UrlsafeBase64", () => {
    let testInstance: UrlsafeBase64;

    beforeEach(() => {
        testInstance = createUrlsafeBase64();
    });

    /**
     * @test {UrlsafeBase64#encode}
     */
    describe("#encode()", () => {
        it("The mode should be encoding", () => expect(testInstance.encode().mode).toBe(Urlbase64Mode.ENCODE));
    });
    /**
     * @test {UrlsafeBase64#decode}
     */
    describe("#decode()", () => {
        it("The mode should be decoding", () => expect(testInstance.decode().mode).toBe(Urlbase64Mode.DECODE));
    });
    /**
     * @test {UrlsafeBase64#update}
     */
    describe("#update()", () => {
        it("Should fill the internal buffer", () => {
            const s = "ABCDEFG";
            testInstance.update(s);
            expect(testInstance.digest().length).toBeGreaterThan(1);
        });
    });
    /**
     * @test {UrlsafeBase64#digest}
     */
    describe("#digest()", () => {
        let message: string;
        let urlbase64_test: string;
        beforeEach(() => {
            message = "+ Hello urlsafebase64 +";
            urlbase64_test = Buffer.from(message).toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
        });
        it("Should encode in url base 64 the internal buffer", () => {
            testInstance.update(message);
            expect(testInstance.digest()).toBe(urlbase64_test);
        });
        it("Should decode the internal buffer", () => {
            testInstance.on("data", (chunk) => {
                expect(chunk.toString()).toBe(message);
            });
            testInstance.write(urlbase64_test);
            testInstance.decode().end();
        });
    });

    describe("@Sealed: ", () => {
        const changeConfig = () => {
            delete UrlsafeBase64.validate;
        };

        it("Should not change the configuration of properties", () => {
            expect(Object.isSealed(Object.getPrototypeOf(testInstance))).toBe(true);
            expect(Object.isSealed(UrlsafeBase64)).toBe(true);
            expect(changeConfig).toThrow(TypeError);
        });
    });

});

function testingPromise(test: (arg?: void) => void) {
    return new Promise<void>((resolve, reject) => {
        try {
            test();
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}
