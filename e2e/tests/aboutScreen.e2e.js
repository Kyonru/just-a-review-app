/* eslint-disable no-undef */
describe('About Screeen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should open about screen', async () => {
    await element(by.id('open_drawer_button')).tap();
    await waitFor(element(by.id('drawer_screen')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.text('About').withAncestor(by.type('DrawerItem'))).tap();
    // await element(by.type('DrawerItem'))
    //   .atIndex(1)
    //   .tap();
    await expect(element(by.id('about_screen'))).toBeVisible();
  });
});
