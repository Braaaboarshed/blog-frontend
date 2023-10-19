const mongoose = require("mongoose");


// // Validate Update Comment Schema
const VerificationTokenSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
  
    },
    
}, {
    timestamps: true,
});

// // Validate Update Comment Model
const VerificationToken = mongoose.model("VerificationToken", VerificationTokenSchema);




module.exports = {
    VerificationToken

}