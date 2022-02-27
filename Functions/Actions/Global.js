import {addValueArray} from "../FIrebase.js";

function createSurveyAction(_, id) {
  try {
    addValueArray("Reference", "Surveys", {id: id})
  } catch (e) {
    throw e
  }
}

export {
  createSurveyAction
}
