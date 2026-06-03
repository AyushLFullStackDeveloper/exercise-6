const {
  SELECTORS,
  launchFreshApp,
  waitForLoginScreen,
  loginWithPassword,
  expectDashboard,
  logoutAndExpectLogin,
  selectRole,
  toggleThemeViaButton,
} = require('../../helpers/detoxAuthHelper');

describe('E2E - Complete User Journey', () => {
  beforeEach(async () => {
    await launchFreshApp();
  });

  it('selects Student role then reaches Dashboard and logs out', async () => {
    await loginWithPassword('divyanshu@gmail.com');
    await selectRole('Student');
    await expectDashboard();
    await logoutAndExpectLogin();
  });

  it('runs login flow successfully after switching theme', async () => {
    await waitForLoginScreen();
    await toggleThemeViaButton();

    await waitFor(element(by.id(SELECTORS.emailInput)))
      .toBeVisible()
      .withTimeout(30000);

    await expect(element(by.id(SELECTORS.emailInput))).toBeVisible();

    await loginWithPassword('ayushn@gmail.com');
    await expectDashboard();
  });
});
