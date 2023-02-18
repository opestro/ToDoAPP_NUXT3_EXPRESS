const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, 'full name field is required'],
    },
    username: {
      type: String,
      required: [true, 'username field is required'],
    },
    password: {
      type: String,
      required: [true, 'age field is required'],
    },
    userId : {
      type: String,
      required: false,
    }
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
   this.password = hash
   next();
  }
  catch (err) {
    next(err);
  }
});
module.exports = model('users', userSchema);
