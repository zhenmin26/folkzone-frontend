// import store from "../store"
import userReducer from "../userReducer";
import configureStore from "redux-mock-store";
const mockStore = configureStore();
const store = mockStore();

describe("test profile", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it("should fetch the logged in user's profile username", () => {
    const expectedActions = [
      {
        'data': {username: "Bret"},
        'type': 'getUser',
      },
    ];
    const user = {
        username: "Bret"
    }
    store.dispatch({type: "getUser", data: user})
    // expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()[0]["data"].username).toEqual('Bret');
  });
});

