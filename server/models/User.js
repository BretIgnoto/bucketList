var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var List = new Schema({
	title: String,
	description: String,
	user: String,
	checked: {type: Number, default: 0},
	created: {type: Date, default: Date.now}
})
var UserSchema = new mongoose.Schema({
	name: String,
	list: [List]
});
var User = mongoose.model('User', UserSchema);