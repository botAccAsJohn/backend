import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  refreshToken: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
});

//hasing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);

  next();
});

// Password Verification
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating JWT Access Token
userSchema.methods.generateAccessToken =  function () { //async <--
  const token = jwt.sign(
    {
      id: this._id,
      phone: this.phone,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return token;
};

userSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
