import {addValueArray} from "../FIrebase.js";
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

function getActionSurvey() {
  const db = admin.firestore()
  const dbRef = db.collection("References")

  dbRef.get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        try {
          console.log(Object.keys(doc))
          console.log(doc)
        } catch (err) {
          console.error(err)
        }
      })
    })
}

function createSurveyAction(_, id) {
  try {
    addValueArray("References", "Surveys", "id_survey", id, {
      done: false
    })
  } catch (e) {
    throw e
  }
}

export {
  createSurveyAction,
  updateStatueSurveyAction,
  getActionSurvey
}
