import renderer from "react-test-renderer";
import {LoginContext} from "../context/LoginContext";
import Chatroom from "../components/chat/Chatroom";
import {MemoryRouter, Route, Routes} from "react-router-dom";





describe("frontend application react", () => {
    it("should render list of messages", async () => {
        const username = "brukernavn";
        const messages = [
            { username: "loyd", message: "testing testing!" },
            { username: "frank", message: "Er det noen her?" },
        ];


        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ messages }),
                ok: true,
            })
        );

        let component;

        await act(async () => {
            component = renderer.create(
                <MemoryRouter initialEntries={["/chatroom/test"]}>
                    <Routes>
                        <Route
                            path="/chatroom/:roomName"
                            element={
                                <LoginContext.Provider value={{ username }}>
                                    <Chatroom />
                                </LoginContext.Provider>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            );
        });

        expect(component).toMatchSnapshot();
    });

    it("renders correctly if not logged in", () => {
        const component = renderer.create(
            <MemoryRouter>
                <Chatroom />
            </MemoryRouter>
        );

        const t = component.toJSON();
        expect(t).toMatchSnapshot();
    });

    it("renders correctly when loading room", () => {
        const username = "brukernavn";
        const component = renderer.create(
            <MemoryRouter>
                <LoginContext.Provider value={{ username }}>
                    <Chatroom />
                </LoginContext.Provider>
            </MemoryRouter>
        );

        const x = component.toJSON();
        expect(x).toMatchSnapshot();
    });


});
