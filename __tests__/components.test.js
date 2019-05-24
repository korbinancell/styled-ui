/* globals describe, it, expect, test, browser */
import assert from 'assert';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

/**
 * Before trying to figure out what errors this might be throwing make sure and run `yarn build`
 * If you're lucky that will fix it.
 */
/* eslint-disable global-require */
describe('components', () => {
	it('should not crash when imported', () => {
		assert.doesNotThrow(() => require('../dist/main'));
		assert.doesNotThrow(() => require('../dist/ag-grid'));
		assert.doesNotThrow(() => require('../dist/text-input'));
		assert.doesNotThrow(() => require('../dist/text-input-v2'));
		assert.doesNotThrow(() => require('../dist/group-selector'));
		assert.doesNotThrow(() => require('../dist/share-dialog'));
	});
});

expect.extend({ toMatchImageSnapshot });

describe('Visual Regressions', async () => {
	test(
		'test button visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/button/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'button-variations',
			});
		},
		16000,
	);

	test(
		'test anchor button visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/button/anchor-button');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'anchor-variations',
			});
		},
		16000,
	);

	test(
		'test checkbox visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/checkbox/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'checkbox-variations',
			});
		},
		16000,
	);

	test(
		'test helpbox visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/help-box/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'helpbox-variations',
			});
		},
		16000,
	);

	test(
		'test parameter sentence visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/parameter-sentence/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'parametersentence-variations',
			});
		},
		16000,
	);

	test(
		'test radio visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/radio/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'radio-variations',
			});
		},
		16000,
	);

	test(
		'test slider visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/slider/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'slider-variations',
			});
		},
		16000,
	);

	test(
		'test tabs visuals',
		async () => {
			const page = await browser.newPage();
			await page.goto('http://localhost:4000/#/tabs/variations');
			const image = await page.screenshot({ fullPage: true });

			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: 'tabs-variations',
			});
		},
		16000,
	);
});