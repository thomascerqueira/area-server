import {addValueArray} from "../FIrebase.js";

export function createSurveyAction(_, id) {
  try {
    addValueArray("Reference", "id_survey", id)
  } catch (e) {
    throw e
  }
}
