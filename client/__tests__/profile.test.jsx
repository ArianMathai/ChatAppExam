import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Profile from "../components/Profile";

describe("snapshot testing profile", () => {
    it("should render not logged in if not logged in", () => {
        const component = renderer.create(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>,
        );
        expect(component).toMatchSnapshot();
    });

});
