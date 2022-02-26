import {addValueArray} from "../FIrebase.js";

function createSurveyAction(_, id) {
  try {
    addValueArray("Reference", "id_survey", {id: id})
  } catch (e) {
    throw e
  }
}

export {
  createSurveyAction
}
