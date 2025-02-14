import { routes } from './mocks/routes';
import { mocks } from './mocks/mocks';
import { RootStore } from './mocks/store';

test('Router Scenario', () => {
    const rootStore = new RootStore();
    const { router } = rootStore;
    router.currentRoute = routes.home;

    expect(router.currentPath).toBe('/');

    router.goTo(routes.profile, { username: 'Simraki' });

    expect(mocks.exitingHome).toBeCalled();
    expect(router.currentPath).toBe('/profile/Simraki');
    expect(mocks.changingParamsProfile).toHaveBeenCalledTimes(0);
    expect(mocks.enteringProfile).lastCalledWith({ username: 'Simraki' });

    router.goTo(routes.profile, { username: 'kristijan' });

    expect(router.currentPath).toBe('/profile/kristijan');
    expect(mocks.enteringProfile).toHaveBeenCalledTimes(1);
    expect(mocks.changingParamsProfile).lastCalledWith(
        { username: 'kristijan' },
        undefined
    );
    expect(mocks.changingParamsProfile).toHaveBeenCalledTimes(1);

    router.goTo(routes.profile, { username: 'kristijan', tab: 'about' });

    expect(router.currentPath).toBe('/profile/kristijan/about');
    expect(mocks.enteringProfile).toHaveBeenCalledTimes(1);
    expect(mocks.changingParamsProfile).lastCalledWith(
        { tab: 'about', username: 'kristijan' },
        undefined
    );
    expect(mocks.changingParamsProfile).toHaveBeenCalledTimes(2);

    router.goTo(routes.home);

    expect(router.currentPath).toBe('/');
    expect(mocks.exitingProfile).toBeCalled();
    expect(mocks.exitingProfile).lastCalledWith({
        tab: 'about',
        username: 'kristijan',
    });
    expect(mocks.enteringHome).toBeCalled();
    expect(mocks.enteringHome).lastCalledWith();
    expect(mocks.changingParamsHome).not.toBeCalled();
    expect(mocks.changingParamsProfile).toHaveBeenCalledTimes(2);
});
