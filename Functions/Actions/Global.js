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

async function updateAllSurveyAction() {
  const db = admin.firestore()
  const dbRef = db.collection("References").doc("Surveys")

  dbRef.get()
    .then((snapshot) => {
      snapshot.data().map((doc) => {
        try {
          updateStatueSurveyAction(Object.keys(doc), false)
        } catch (e) {
          console.error("Error updateAllSurveyAction update Survey action", e)
        }
      })
    })
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
  getActionSurvey,
  updateAllSurveyAction
}
