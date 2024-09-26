const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   media: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  name: {
    type: String,
    required: true,
  },
  ancestry: {
    type: String,
    required: true,
  },
  str: {
    type: Number,
    required: true,
  },
  int: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  maxXp: {
    type: Number,
    required: true,
  },
  dex: {
    type: Number,
    required: true,
  },
  wis: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  con: {
    type: Number,
    required: true,
  },
  cha: {
    type: Number,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  deity: {
    type: String,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  ac: {
    type: Number,
    required: true,
  },
  attack1: {
    type: String,
    required: false,
  },
  attack2: {
    type: String,
    required: false,
  },
  attack3: {
    type: String,
    required: false,
  },
  attack4: {
    type: String,
    required: false,
  },
  talent1: {
    type: String,
    required: false,
  },
  talent2: {
    type: String,
    required: false,
  },
  talent3: {
    type: String,
    required: false,
  },
  talent4: {
    type: String,
    required: false,
  },
  talent5: {
    type: String,
    required: false,
  },
  talent6: {
    type: String,
    required: false,
  },
  talent7: {
    type: String,
    required: false,
  },
  talent8: {
    type: String,
    required: false,
  },
  spell1: {
    type: String,
    required: false,
  },
  spell2: {
    type: String,
    required: false,
  },
  spell3: {
    type: String,
    required: false,
  },
  spell4: {
    type: String,
    required: false,
  },
  spell5: {
    type: String,
    required: false,
  },
  spell6: {
    type: String,
    required: false,
  },
  spell7: {
    type: String,
    required: false,
  },
  spell8: {
    type: String,
    required: false,
  },
  spell9: {
    type: String,
    required: false,
  },
  spell10: {
    type: String,
    required: false,
  },
  spell11: {
    type: String,
    required: false,
  },
  spell12: {
    type: String,
    required: false,
  },
  spell13: {
    type: String,
    required: false,
  },
  spell14: {
    type: String,
    required: false,
  },
  spell15: {
    type: String,
    required: false,
  },
  spell16: {
    type: String,
    required: false,
  },
  gear1: {
    type: String,
    required: false,
  },
  gear2: {
    type: String,
    required: false,
  },
  gear3: {
    type: String,
    required: false,
  },
  gear4: {
    type: String,
    required: false,
  },
  gear5: {
    type: String,
    required: false,
  },
  gear6: {
    type: String,
    required: false,
  },
  gear7: {
    type: String,
    required: false,
  },
  gear8: {
    type: String,
    required: false,
  },
  gear9: {
    type: String,
    required: false,
  },
  gear10: {
    type: String,
    required: false,
  },
  gear11: {
    type: String,
    required: false,
  },
  gear12: {
    type: String,
    required: false,
  },
  gear13: {
    type: String,
    required: false,
  },
  gear14: {
    type: String,
    required: false,
  },
  gear15: {
    type: String,
    required: false,
  },
  gear16: {
    type: String,
    required: false,
  },
  gear17: {
    type: String,
    required: false,
  },
  gear18: {
    type: String,
    required: false,
  },
  gear19: {
    type: String,
    required: false,
  },
  gear20: {
    type: String,
    required: false,
  },
  gp: {
    type: Number,
    required: false,
  },
  sp: {
    type: Number,
    required: false,
  },
  cp: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: { type: Date },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});
PostSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  count: true
});


module.exports = mongoose.model("Post", PostSchema);
