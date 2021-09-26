// eslint-disable-next-line
import React from 'react';
import { Route } from '../src';

test('Route', () => {
    const route = new Route<
        any,
        {
            username: string;
            tab: string;
        }
    >({
        path: '/profile/:username/:tab',
        component: <div />
    });

    const replacedUrlParams = route.replaceUrlParams({
        username: 'Simraki',
        tab: 'profile'
    });
    const paramsObject = route.getParamsObject(['Simraki', 'profile']);

    expect(route.path).toBe('/profile/:username/:tab');
    expect(paramsObject).toEqual({
        tab: 'profile',
        username: 'Simraki'
    });
    expect(replacedUrlParams).toBe('/profile/Simraki/profile');
    expect(route.rootPath).toBe('/profile');
});
