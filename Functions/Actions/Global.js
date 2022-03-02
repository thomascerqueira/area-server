import {addValueArray} from "../Firebase.js";
import {admin} from "../../config.js";

function updateStatueSurveyAction(id, value) {
  try {
    addValueArray("References", "Surveys", "id_survey", id, {
      done: value
    })
  } catch (err) {
    throw err
  }
}

async function getActionSurvey() {
  const db = admin.firestore()
  const dbRef = db.collection("References").doc("Surveys")

  try {
    let result = await dbRef.get()
    return result.data()
  } catch (err) {
    return err
  }
}

function createSurveyAction(data, id) {
  try {
    addValueArray("References", "Surveys", "id_survey", id, {
      done: false
    })
    return data
  } catch (e) {
    throw e
  }
}

export {
  createSurveyAction,
  updateStatueSurveyAction,
  getActionSurvey
}
