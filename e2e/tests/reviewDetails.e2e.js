/* eslint-disable no-undef */
describe('Review Details', () => {
  beforeEach(async () => {});

  it('should open review details screen', async () => {
    await element(by.id('open_drawer_button')).tap();
    await waitFor(element(by.id('drawer_screen')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('populate_date_button')).tap();
    await waitFor(element(by.id('review_list_screen')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('review_list_item')).tap();
    await waitFor(element(by.id('review_details_screen')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('show_logs_button')).tap();
    await waitFor(element(by.id('log_list_screen')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('log_list_item')).tap();
    await waitFor(element(by.id('log_details_screen')))
      .toBeVisible()
      .withTimeout(1000);
  });
});
