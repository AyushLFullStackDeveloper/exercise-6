const TIMEOUT = 30000;

const SELECTORS = {
  emailInput: 'emailInput',
  usePasswordButton: 'usePasswordButton',
  passwordInput: 'passwordInput',
  loginButton: 'loginButton',
  authErrorText: 'authErrorText',
  dashboardScreen: 'dashboardScreen',
  dashboardGreetingTitle: 'dashboardGreetingTitle',
  logoutButton: 'logoutButton',
  instituteSelectionScreen: 'instituteSelectionScreen',
  roleSelectionScreen: 'roleSelectionScreen',
  themeToggleButton: 'themeToggleButton',
};

const instituteTestId = instituteId => `instituteCard_${instituteId}`;

const roleTestId = role => {
  const sanitizedRoleName = role
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

  return `roleCard_${sanitizedRoleName}`;
};

async function launchFreshApp() {
  await device.launchApp({
    newInstance: true,
    delete: true,
  });
}

async function waitForLoginScreen() {
  await waitFor(element(by.id(SELECTORS.emailInput)))
    .toBeVisible()
    .withTimeout(TIMEOUT);
}

async function loginWithPassword(email, password = '123') {
  await waitForLoginScreen();

  await element(by.id(SELECTORS.emailInput)).tap();
  await element(by.id(SELECTORS.emailInput)).replaceText(email);

  await waitFor(element(by.id(SELECTORS.usePasswordButton)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(by.id(SELECTORS.usePasswordButton)).tap();

  await waitFor(element(by.id(SELECTORS.passwordInput)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(by.id(SELECTORS.passwordInput)).tap();
  await element(by.id(SELECTORS.passwordInput)).replaceText(password);

  await waitFor(element(by.id(SELECTORS.loginButton)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(by.id(SELECTORS.loginButton)).tap();
}

async function expectDashboard() {
  await waitFor(element(by.id(SELECTORS.dashboardScreen)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await waitFor(element(by.id(SELECTORS.dashboardGreetingTitle)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await expect(element(by.id(SELECTORS.dashboardScreen))).toBeVisible();
}

async function logoutAndExpectLogin() {
  await waitFor(element(by.id(SELECTORS.logoutButton)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(by.id(SELECTORS.logoutButton)).tap();
  await waitForLoginScreen();
}

async function selectInstituteByName(name) {
  await waitFor(element(by.id(SELECTORS.instituteSelectionScreen)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  const instituteMatcher = /^\d+$/.test(String(name))
    ? by.id(instituteTestId(name))
    : by.text(name);

  await waitFor(element(instituteMatcher))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(instituteMatcher).tap();
}

async function selectRole(roleName) {
  await waitFor(element(by.id(SELECTORS.roleSelectionScreen)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  const id = roleTestId(roleName);

  await waitFor(element(by.id(id)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(by.id(id)).tap();
}

async function toggleThemeViaButton() {
  await waitFor(element(by.id(SELECTORS.themeToggleButton)))
    .toBeVisible()
    .withTimeout(TIMEOUT);

  await element(by.id(SELECTORS.themeToggleButton)).tap();
}

module.exports = {
  SELECTORS,
  launchFreshApp,
  waitForLoginScreen,
  loginWithPassword,
  expectDashboard,
  logoutAndExpectLogin,
  selectInstituteByName,
  selectRole,
  toggleThemeViaButton,
};
