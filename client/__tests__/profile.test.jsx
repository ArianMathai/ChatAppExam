import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Profile from "../components/Profile";

describe("snapshot testing profile", () => {
    it("should not render profile if not logged in", () => {
        const component = renderer.create(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>,
        );

        const profile = component.toJSON();
        expect(profile).toMatchSnapshot();
    });

});
