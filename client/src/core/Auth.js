class AuthClass {
  constructor() {
    this.token = localStorage.getItem("token");
  }

  //login
  login({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            localStorage.setItem("token", data.token);
            resolve(data.user);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //register
  register({ displayName, email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/users/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName,
            email,
            password,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 201) {
            localStorage.setItem("token", data.token);
            resolve(data.user);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //upate user
  update(toUpdate) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/users/me", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...toUpdate,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data.user);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //get User
  getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data.user);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //logout
  logout() {
    localStorage.removeItem("token");
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/users/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            // localStorage.removeItem("token");
            resolve(data.user);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //delete user
  deleteUser() {
    localStorage.removeItem("token");
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/users/me", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            // localStorage.removeItem("token");
            resolve(data.user);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  isLoggedIn() {
    return new Promise(async (resolve, reject) => {
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch("api/users/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          await response.json().then((data) => {
            if (response.status === 200) {
              resolve(data.user);
            } else {
              reject(data);
            }
          });
        } catch (error) {
          reject(error);
        }
      } else {
        reject();
      }
    });
  }
}

export default AuthClass;
