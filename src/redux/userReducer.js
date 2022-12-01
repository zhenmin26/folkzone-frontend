let initState = {
  login: false,
  allUsers: [],
  friendUserIds: [],
  friends: [],
  curUser: {},
  allPostsInUser: [],
  postsInUser: [],
  error: "",
};
export { initState };

export default function userReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case "changeLoginStatus":
      // preState.login = data;
      return { ...preState, login: data };

    case "getAllUser":
      // preState.allUsers = data;
      // return preState;
      return { ...preState, allUsers: data };

    // case "setCurUser":

    case "getUser":
      // preState.curUser = data;
      // console.log(preState.curUser)
      // return preState;
      if (data !== {}) {
        return { ...preState, curUser: data };
      } else {
        return { ...preState, error: "Invalid user" };
      }

    case "getFriendUserId":
      // preState.friendUserIds = data;
      // localStorage.setItem("friendUserIds", JSON.stringify(preState.friendUserIds));
      // console.log(preState.friendUserIds)
      // return preState;
      return { ...preState, friendUserIds: data };

    case "getFriends":
      // console.log(data)
      return { ...preState, friends: data };

    case "addFriend":
      // preState.friendUserIds.push(data);
      // localStorage.setItem("friendUserIds", JSON.stringify(preState.friendUserIds));
      // console.log(preState.friendUserIds)
      // return preState
      return {
        ...preState,
        friendUserIds: preState.friendUserIds.concat([data]),
      };

    case "removeFriend":
      const indexOfRemovedFriend = preState.friendUserIds.indexOf(data);
      if (indexOfRemovedFriend > -1) {
        preState.friendUserIds.splice(indexOfRemovedFriend, 1);
      }
      return {
        ...preState,
        friendUserIds: preState.friendUserIds,
      };

    case "changeUserState":
      preState.curUser.company.catchPhrase = data;
      return { ...preState };

    case "getAllPostsInUser":
      return { ...preState, allPostsInUser: data };

    case "getpostsInUser":
      // console.log(data)
      return { ...preState, postsInUser: data };

    case "addPostsInUser":
      // console.log(preState.postsInUser.concat(data))
      return { ...preState, postsInUser: preState.postsInUser.concat(data) };

    default:
      return preState;
  }
}
