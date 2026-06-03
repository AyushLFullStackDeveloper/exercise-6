const {
  SELECTORS,
  launchFreshApp,
  waitForLoginScreen,
  loginWithPassword,
  expectDashboard,
  logoutAndExpectLogin,
  toggleThemeViaButton,
} = require('../../helpers/detoxAuthHelper');

describe('E2E - Login Flow', () => {
  beforeEach(async () => {
    await launchFreshApp();
  });

  it('shows No Institutes Assigned error for a user without context', async () => {
    await loginWithPassword('ayushb@gmail.com');

    await waitFor(element(by.id(SELECTORS.authErrorText)))
      .toBeVisible()
      .withTimeout(30000);

    await expect(element(by.id(SELECTORS.authErrorText))).toBeVisible();
  });

  it('logs in directly to Dashboard and logs out', async () => {
    await loginWithPassword('ayushn@gmail.com');
    await expectDashboard();
    await logoutAndExpectLogin();
  });

  it('keeps Login screen functional after theme toggle', async () => {
    await waitForLoginScreen();
    await expect(element(by.id(SELECTORS.emailInput))).toBeVisible();

    await toggleThemeViaButton();

    await waitFor(element(by.id(SELECTORS.emailInput)))
      .toBeVisible()
      .withTimeout(30000);

    await expect(element(by.id(SELECTORS.emailInput))).toBeVisible();
  });
});
