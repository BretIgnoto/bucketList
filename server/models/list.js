var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Comments = new Schema({
	comment: String,
	likes: {type: Number, default: 0},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	created: {type: Date, default: Date.now}
})
var ListSchema = new mongoose.Schema({
  title: String,
  description: String,  
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  tagged_user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  checked: {type: Boolean, default: false},
  comments: [Comments],
  created_at: {type: Date, default: Date.now},
});

var List = mongoose.model('List', ListSchema);