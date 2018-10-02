import tasks from "./tasks.json";
import generateRandomId from "./utils";

function delay(t) {
  return new Promise(res => {
    setTimeout(res, t);
  });
}
const delayResolve = (value, t = 2000) => {
  return delay(t).then(() => value);
};

// () => Promise<Tasks[]>
export const getTasks = () => delayResolve(tasks.map(task => ({ ...task })));

// (taskName:String) => Promise<Task>
export const addTask = taskName => {
  const newTask = {
    taskName,
    finished: false,
    id: generateRandomId()
  };
  tasks.push(newTask);
  return delayResolve({ ...newTask });
};

// (id:String) => Promise<Task>
export const toggleTask = id => {
  const foundTask = tasks.find(t => t.id === id);
  if (foundTask) {
    foundTask.finished = !foundTask.finished;
  }
  console.log("Toggled:", id, tasks);
  return delayResolve(foundTask && { ...foundTask });
};
