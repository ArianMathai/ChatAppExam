import React from 'react';
import renderer, {act} from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
    })
);

jest.mock('../components/auth/Logout.jsx', () => 'Logout');

describe('App Component', () => {
    it('should match the snapshot', async () => {
        let component;
        await act(() => {
            component = renderer.create(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
        });
        expect(component).toMatchSnapshot();
    });
});
