import {addValueArray} from "../FIrebase.js";

function createSurveyAction(_, id) {
  try {
    addValueArray("Reference", "Surveys", "id_survey", id)
  } catch (e) {
    throw e
  }
}

export {
  createSurveyAction
}
