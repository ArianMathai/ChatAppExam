import renderer, { act } from "react-test-renderer";
import Tasks from "../components/Tasks";
import {LoginContext} from "../context/LoginContext";



describe("frontend application react", () => {
    it("should render list of tasks", async () => {
        const username = "brukernavn";
        const tasks = [
            { title: "Task 1", isDone: false },
            { title: "Task 2", isDone: true },
        ];


        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ tasks }),
                ok: true,
            })
        );

        const component = renderer.create(
            <LoginContext.Provider value={{ username }}>
                <Tasks />
            </LoginContext.Provider>
        );

        await act(async () => {

        });

        expect(component).toMatchSnapshot();
    });

});
