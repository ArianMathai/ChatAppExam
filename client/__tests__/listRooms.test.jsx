import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ListRooms from '../components/chat/ListRooms';
import { LoginContext } from '../context/LoginContext';


global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve([
                { roomName: 'MockedRoom1', participants: ['user1', 'user2'] },
                { roomName: 'MockedRoom2', participants: ['user1', 'user3'] },
            ]),
    })
);


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('ListRooms Component', () => {
    it('renders rooms correctly', async () => {
        let component;
        const username = 'brukernavn';

        await act(async () => {
            component = renderer.create(
                <LoginContext.Provider value={{ username: username }}>
                    <ListRooms />
                </LoginContext.Provider>
            );
        });

        expect(component).toMatchSnapshot();
    });
});
