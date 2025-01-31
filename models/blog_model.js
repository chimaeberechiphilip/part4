const mongoose=require("mongoose")

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    minLength: 5,
    required: true,
  },
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, "Author URl required"],
  },
  likes: {
    type: Number,
    minLength: 1,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports=Blog;
