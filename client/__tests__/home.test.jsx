import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';

describe('Home component', () => {

    it('should have the correct class names', () => {
        const component = renderer.create(<Home />);
        const instance = component.root;

        const headerElement = instance.findByProps({ className: 'home-header' });
        const textDiv = instance.findByProps({ className: 'home-text-div' });
        const textElement = instance.findByProps({ className: 'home-text' });

        expect(headerElement.props.className).toBe('home-header');
        expect(textDiv.props.className).toBe('home-text-div');
        expect(textElement.props.className).toBe('home-text');
    });

    it('should match the snapshot', () => {
        const component = renderer.create(<Home />);
        expect(component).toMatchSnapshot();
    });
});
