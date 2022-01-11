class TaskClass {
  constructor() {}

  //create task
  createTask(task) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/tasks", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(task),
        });
        await response.json().then((data) => {
          if (response.status === 201) {
            resolve(data.tasks);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //get task
  getTasks(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`api/tasks?${params}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data.tasks);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //search task
  searchTasks({ params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`api/tasks/search?${params}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          // console.log(data);
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //get single task
  getSingleTask({ id }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`api/tasks/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data.tasks);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //delete task
  deleteTasks(task) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`api/tasks/${task._id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(task);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //update task
  updateTask({ id, completed, priorotize }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`api/tasks/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            completed,
            priorotize,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data.tasks);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default TaskClass;
