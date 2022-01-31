import Mongodb from 'mongodb';
import mongoose from 'mongoose';


const userSchema = mongoose.model('User', new mongoose.Schema({
  uid: {type: String, required: true},
  email: {type: String, required: true},
  name: {type: String, required: true},
  services: {type: Object, required: false, default: [
      {
        name: "gmail",
        connected: false
      },
      {
        name: "github",
        connected: false
      }
      ]
    }
  }
  )
)


export {
  userSchema
}