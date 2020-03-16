const mgoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mgoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
});

userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (!errror) {
      user.password = hash;
      next();
    }
    return next(error);
  });
});

userSchema.statics.authenticate = (email, username, password, callback) => {
  User.findOne({ username, email }).exec((error, user) => {
    if (error) {
      return callback(error);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result == true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

const User = mgoose.model("User", userSchema);
module.exports = User;
