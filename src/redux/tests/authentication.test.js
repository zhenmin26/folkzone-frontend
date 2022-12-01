import userReducer from "../userReducer";
import configureStore from "redux-mock-store";
const mockStore = configureStore();
const store = mockStore();

import { initState } from "../userReducer";

describe("test anthentication", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it("should log in a previously registered user", () => {
    const user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };
    expect(userReducer({...initState, curUser: user, login: true}, { type: "getUser", data: user },{ type: "changeLoginStatus", data: true })).toEqual({
      ...initState,
      curUser: user,
      login: true
    });
  });

  it("should not log in an invalid user", () => {
    expect(userReducer({...initState, error: "Invalid User"}, { type: "getUser", data: {} })).toEqual({
      ...initState,
      error: "Invalid User"
    });
  });

  it("should log out a user", () => {
    // const store = mockStore(initState);
    // store.dispatch({type: "changeLoginStatus", data: false})
    expect(userReducer({...initState, login: true},{ type: "changeLoginStatus", data: false })).toEqual({
      ...initState,
      login: false,
    });
  });
});
