import axios from "axios";
export const url = process.env.BACKEND_URL;
axios.defaults.withCredentials = true;
export async function isAuthenticated() {
  try {
    //if authenticated ,give saved data in db
    const response = await axios.get(url + "/admin/auto-save");
    // console.log(response);
    return response.data.message;
  } catch (error) {
    return false;
  }
  // console.log(response);
}
function debounce(autoSave, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("deboumce called");
      autoSave(args);
    }, delay);
  };
}
export async function autoSave(...args) {
  // console.log("autosaved is called with", args[0]);
  // console.log("debounce called from frontend");
  const questions = args[0][0];
  const title = args[0][1];
  const data = { title, questions };
  // console.log(data);

  try {
    const response = await axios.post(url + "/admin/auto-save", data);
    // (response);
  } catch (error) {
    // console.log(error);
  }
}
async function autoSaveUserQuiz(...args) {
  // console.log("autosaved is called with", args[0]);
  console.log("debounce called for user quiz");
  const data = args[0][0];
  const quizId = args[0][1];
  // console.log(data);

  try {
    const response = await axios.post(
      url + "/user/quiz/auto-save/" + quizId,
      data
    );
    // console.log(response);
  } catch (error) {
    // console.log(error);
  }
}
export const betterFunction = debounce(autoSave, 2000);
export const autoSaveQuiz = debounce(autoSaveUserQuiz, 2000);
