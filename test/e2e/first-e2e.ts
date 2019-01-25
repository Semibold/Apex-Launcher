import path from 'path';
import { expect } from 'chai';
import { browser } from 'protractor';

describe('App Demo Page', function() {
    it('should have a title', async function() {
        browser.get(`file:///${path.resolve('demo/index.html')}`);

        expect(await browser.getTitle()).to.equal('DEMO');
    });
});
