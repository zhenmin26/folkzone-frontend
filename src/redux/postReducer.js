let initState = {
  allPosts: [],
  posts: []
};

export default function postReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case "getAllPost":
      return {...preState, allPosts: data}

    case "getPosts":
      console.log(data)
      return {...preState, posts: data}

    case "addPosts":
      preState.posts = preState.posts.concat(data);
      return {...preState}

    default:
      return {...preState};
  }
}
