import { TEST_IDS } from '#constants/test';
import { downSeclect, type Locator } from '#fixtures/e2e';
import { test as baseTest, expect } from '../fixtures';

const test = baseTest.extend<{
  locSelect: (name: string) => Locator;
  selectOption: (name: string) => Promise<void>;
}>({
  locSelect: ({ page }, use) => {
    const func = (_name: string) => {
      const name = downSeclect(_name);
      return page.getByRole('button', { name });
    };

    return use(func);
  },

  selectOption: async ({ page, locSelect }, use) => {
    const func = async (name: string) => {
      const locOption = page.getByRole('option', { name });
      await expect(locOption).toBeVisible();
      await locOption.click();
      await expect(locSelect(name)).toBeVisible({
        timeout: 1500,
      });
    };

    return use(func);
  },

  page: async ({ page }, use) => {
    const locExpand = page
      .getByRole('button')
      .and(page.getByTestId(TEST_IDS.field(1)));

    // : page.getByTestId(expandId(1));
    // : page.locator('[data-testid^="field-1"]');

    await test.step('#00 => Expand Accordion', () =>
      locExpand.click({ timeout: 10_000 }));

    return use(page);
  },
});

export { expect, test };
