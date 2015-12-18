module.exports = {
	userSchema: {},

	createDatabaseSchemas: function(Schema) {
		this.userSchema = new Schema({
			username: { type: String, required: true, index: { unique: true } },
			username_lower: { type: String, required: true },
			placing: { type: Number, required: true },
            points: { type: Number, required: true }
		});
	}
}