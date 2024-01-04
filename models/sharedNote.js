const mongoose = require("mongoose");

const sharedNoteSchema = new mongoose.Schema({
    note_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Note',
        required : true
    },
    shared_note_userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const sharedNote = mongoose.model("sharedNote", sharedNoteSchema);

module.exports = sharedNote;