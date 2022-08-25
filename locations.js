const { Schema, default: mongoose } = require("mongoose");

const {
	Types: { ObjectId },
} = Schema;
1;
const locationsSchema = new Schema(
	{
		theatre_name: String,
		timings: [String],
		location: String,
		price: Number,
	},
	{ timestamps: true }
);

exports.Locations = mongoose.model("Locations", locationsSchema);
