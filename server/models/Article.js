const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;       // ✅ Add `id` field
        delete ret._id;         // ✅ Remove `_id`
        delete ret.__v;         // ✅ Optional: remove Mongoose internal version field
      }
    }
  }
);

module.exports = mongoose.model('Article', articleSchema);
