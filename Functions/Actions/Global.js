import {addValueArray} from "../FIrebase.js";

function updateStatueSurveyAction(id, value) {
  try {
    addValueArray("References", "Surveys", "id_survey", {
      id: id,
      done: value
    })
  } catch (err) {
    throw err
  }
}

function createSurveyAction(_, id) {
  try {
    addValueArray("References", "Surveys", "id_survey", {
      id: id,
      done: false
    })
  } catch (e) {
    throw e
  }
}

export {
  createSurveyAction,
  updateStatueSurveyAction
}
