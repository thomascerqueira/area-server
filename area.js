import mongoose from 'mongoose';


const userSchema = mongoose.model('Area', new mongoose.Schema({
  action_id: {type: Number, required: true},
  hook_id: {type: Number},
  reaction_id: {type: Number, required: true}
  })
)


export {
  userSchema
}