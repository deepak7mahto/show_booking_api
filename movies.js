const { Schema, default: mongoose } = require("mongoose");

const {
	Types: { ObjectId },
} = Schema;
1;
const moviesSchema = new Schema(
	{
		name: String,
		cast: String,
		language: String,
		genre: String,
		locations: [{ type: ObjectId, ref: "Location" }],
	},
	{ timestamps: true }
);

exports.Movies = mongoose.model("Movies", moviesSchema);
