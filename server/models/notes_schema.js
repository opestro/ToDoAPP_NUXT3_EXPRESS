const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: [true, 'task field is required'],
    },
    isDone: {
        type: boolean,
        required: false,
      },
  },
  { timestamps: true },
);

module.exports = model('task', taskSchema);
