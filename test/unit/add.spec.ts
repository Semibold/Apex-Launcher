import { expect } from "chai";
import { add } from "../../src/scripts/add";

describe("Utils", function() {
    describe("add()", function() {
        it("should return 2 when the input is 1 and 1", function() {
            expect(add(1, 1)).to.be.equal(2);
        });
    });
});
