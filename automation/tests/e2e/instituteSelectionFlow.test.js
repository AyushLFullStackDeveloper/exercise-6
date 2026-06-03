const {
  launchFreshApp,
  loginWithPassword,
  expectDashboard,
  logoutAndExpectLogin,
  selectInstituteByName,
  selectRole,
} = require('../../helpers/detoxAuthHelper');

describe('E2E - Institute Selection Flow', () => {
  beforeEach(async () => {
    await launchFreshApp();
  });

  it('selects institute and Admin role before reaching Dashboard', async () => {
    await loginWithPassword('ayushl@gmail.com');
    await selectInstituteByName('Guru Nanak Institute of Technology');
    await selectRole('Admin');
    await expectDashboard();
    await logoutAndExpectLogin();
  });

  it('supports another Admin user through institute selection', async () => {
    await loginWithPassword('pratik@gmail.com');
    await selectInstituteByName('Guru Nanak Institute of Technology');
    await selectRole('Admin');
    await expectDashboard();
    await logoutAndExpectLogin();
  });
});
