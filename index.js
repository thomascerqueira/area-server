import express from 'express';
import dotenv from 'dotenv'
import loggerMiddleware from './Middleware/Logger/logger.js'
import authRoute from './Routes/Auth/auth.js'
import servicesRoute from './Routes/Services/services.js'
import githubActionsRoutes from './Routes/Actions/github.js'
import actionsRoutes from './Routes/Actions/Global.js'
import oauthRoutes from './Routes/Oauth/Oauth.js'
import aboutRoutes from './Routes/About.js'
import pkg from 'cors';
import nodeCron from 'node-cron';
import {admin, allDb} from './config.js';
import {getOneValueDb} from "./Functions/MongoDB/getValueDb.js";
import {dispatchReaction} from "./Functions/Reaction/Global.js";
import {customAction} from "./Middleware/Actions/Global.js";
import {updateAllStatusSurveyAction, updateStatueSurveyAction} from "./Functions/Actions/Global.js";
const { cors } = pkg;
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.set('trust_proxy', true)
app.use(pkg());
app.use(express.json())
app.use(loggerMiddleware)
app.use('/auth', authRoute)
app.use('/services', servicesRoute)
app.use('/actions/github', githubActionsRoutes)
app.use('/actions', actionsRoutes)
app.use('/oauth', oauthRoutes)
app.use('/', aboutRoutes)
app.set('view engine', 'ejs');
// app.use('/mongoDb', mongoDbRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
})

nodeCron.schedule("* 30 7 * * *", async () => {
  updateAllStatusSurveyAction()
})

nodeCron.schedule('* * * * *', async () => {
  const db = admin.firestore()
  const dbRef = db.collection("References")

  dbRef.get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data()) {
          const field = doc.data()
          try {
            Object.keys(field).map((surveyID) => {
              getOneValueDb(allDb["ActionReaction"], "ActionReaction", {
                id: surveyID
              }).then((data) => {
                try {
                  if (field[surveyID].done === false) {
                    customAction[data.action.actionName](data.action.data, data.uid)
                      .then((result) => {
                        if (result) {
                          dispatchReaction(data, result)
                            .then(() => {
                              console.log("Dispatch function for ", surveyID)
                              updateStatueSurveyAction(surveyID, true)
                            })
                            .catch((err) => {
                              console.error("Error dispatch function", err)
                            })
                        } else {
                          console.log("Result not false for ", surveyID)
                        }
                      })
                      .catch((err) => {
                        console.error("Error Custom Action", err)
                      })
                  }
                } catch (e) {
                  console.log("Error on id ", surveyID, e)
                }
              })
            })
          } catch (err) {
            console.error("Error nodeCron", err);
          }
        }
      })
    })
    .catch((err) => {
      console.error(err)
    })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
