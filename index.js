import express from 'express';
import dotenv from 'dotenv'
import loggerMiddleware from './Middleware/Logger/logger.js'
import authRoute from './Routes/Auth/auth.js'
import servicesRoute from './Routes/Services/services.js'
import githubActionsRoutes from './Routes/Actions/github.js'
import actionsRoutes from './Routes/Actions/Global.js'
import pkg from 'cors';
import nodeCron from 'node-cron';
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
// app.use('/mongoDb', mongoDbRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

nodeCron.schedule('* * * * *', async () => {
  /*
  ** get id list
  ** tableau de fonction => bonne action
  ** si l'action return true => reaction
  ** sinon next
  */
  console.log('Task running');
  await delay(10000)
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
