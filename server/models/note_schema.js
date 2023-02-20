const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: [true, 'note field is required'],
    },
    isDone: {
        type: Boolean,
        required: false,
      }
  },
  { timestamps: true },
);

module.exports = model('note', noteSchema);
