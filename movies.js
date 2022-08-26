const { Schema, default: mongoose } = require("mongoose");

const {
	Types: { ObjectId },
} = Schema;
1;
const moviesSchema = new Schema(
	{
		movie_name: { type: String, required: true },
		cast_name: { type: String, required: true },
		language: { type: String, required: true },
		genre: { type: String, required: true },
		locations: [{ type: ObjectId, ref: "Location", required: true }],
	},
	{ timestamps: true }
);

exports.Movies = mongoose.model("Movies", moviesSchema);
