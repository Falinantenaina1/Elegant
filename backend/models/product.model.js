import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    color: String,
    isFeatured: { type: Boolean, default: false },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, enum: ["Headbands", "Earbuds", "Accessories"] },
    publicId: { type: String },
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

//Review count

productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = total / this.reviews.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
