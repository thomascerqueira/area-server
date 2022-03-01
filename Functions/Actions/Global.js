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

function getActionSurvey() {
  const db = admin.firestore()
  const dbRef = db.collection("References")

  dbRef.get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        try {
          console.log(Object.keys(doc.data()))
          console.log(doc.data())
        } catch (err) {
          console.error(err)
        }
      })
    })
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
