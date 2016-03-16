module.exports = {
	userSchema: {},
	fridayFinalsSchema: {},

	createDatabaseSchemas: function(Schema) {
		this.userSchema = new Schema({
			username: { type: String, required: true, index: { unique: true } },
			username_lower: { type: String, required: true },
			placing: { type: Number, required: true },
			old_placing: {type: Number, required: true},
            points: { type: Number, required: true }
		});

	    this.fridayFinalsSchema = new Schema({
			player_one: { type: String },
			player_one_seed: { type: Number },
			player_two: { type: String },
			player_two_seed: { type: Number },
			round: { type: Number },
			type: { type: Number, required: true }
	    });
	}
}