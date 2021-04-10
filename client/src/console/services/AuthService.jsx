export default {
  isAuthenticated: () => {
    return fetch("/api/authenticated", {
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((res) => {
      console.log("api call done");
      if (res.status !== 401) {
        console.log("status not 401");
        return res.json().then((data) => data);
      } else {
        return {
          isAuthenticated: false,
          user: { username: "", _id: "", role: "" },
        };
      }
    });
  },
};
