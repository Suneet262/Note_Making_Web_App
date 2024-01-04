const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    username : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    title : {
        type : String,
        required : true,
    },
    content: { 
        type: String,
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;