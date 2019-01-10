import { expect } from "chai";

describe("Array", function() {
    describe("#indexOf()", function() {
        it("should return -1 when the value is not present", function() {
            expect([1, 2, 3].indexOf(4)).to.be.equal(-1);
        });
    });
});

if (typeof self !== "undefined") {
    for (const prop in self) {
        // tslint:disable-next-line
        console.log(`${prop} type:`, typeof self[prop]);
    }
}
