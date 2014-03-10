//currently using mongoose, rewrite in pure mongo

var MessageSchema = new Schema({
	message : String,
	points : Number, 
  	coordinates : { type: [], index: '2dsphere' },
  	type: String
});