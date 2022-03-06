import mongoose from 'mongoose';


const userSchema = mongoose.model('User', new mongoose.Schema({
      uid: {type: String, required: true},
      email: {type: String, required: true},
      name: {type: String, required: true},
      services: {
        type: Object, required: false, default: {
          battleNet: {
            connected: false,
            token: "",
            refresh_token: ""
          },
          spotify: {
            connected: false,
            token: "",
            refresh_token: ""
          },
          github: {
            connected: false,
            token: "",
            refresh_token: ""
          }
        }
      }
    }
  )
)


export {
  userSchema
}
