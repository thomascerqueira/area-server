import {addValueArray} from "../FIrebase.js";

function updateStatueSurveyAction(id, value) {
  try {
    addValueArray("References", "Surveys", "id_survey", id, {
      done: value
    })
  } catch (err) {
    throw err
  }
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
  updateStatueSurveyAction
}
