/* eslint-disable no-undef */
describe('Create Review', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create review', async () => {
    await element(by.id('FAB_button')).tap();
    await element(by.id('in_app_button')).tap();
    await element(by.id('name_text_input')).typeText('Test Review');
    await element(by.id('question_text_input')).typeText('Test Question');
    await element(by.id('question_text_input')).tapReturnKey();
    await element(by.id('add_question_button')).tap();
    await expect(element(by.id('question_list'))).toExist();
    await waitFor(element(by.id('add_review_button')))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id('add_review_button')).tap();
    await waitFor(element(by.id('review_list_screen')))
      .toBeVisible()
      .withTimeout(1000);
  });
});
