/* eslint-disable no-undef */
describe('Navigation', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have empty review list', async () => {
    await expect(element(by.id('emptyState'))).toBeVisible();
  });

  it('should open create review screen', async () => {
    await element(by.id('FAB_button')).tap();
    await element(by.id('in_app_button')).tap();
    await expect(element(by.id('create_screen'))).toBeVisible();
  });
});
