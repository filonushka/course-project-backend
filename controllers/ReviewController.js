import ReviewModel from "../models/Review.js";

export const getAll = async (req, res) => {
  try {
    const reviews = await ReviewModel.find().populate("user").exec();

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const reviewId = req.params.id;

    ReviewModel.findOne(
      {
        _id: reviewId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to show review",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Review not found",
          });
        }
        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const reviewId = req.params.id;

    ReviewModel.findOneAndDelete(
      {
        _id: reviewId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to delete review",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Review not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ReviewModel({
      title: req.body.title,
      text: req.body.text,
      product: req.body.product,
      imageUrl: req.body.imageUrl,
      rating: req.body.rating,
      likes: req.body.likes,
      tags: req.body.tags,
      user: req.userId,
    });

    const review = await doc.save();

    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create review",
    });
  }
};

export const update = async (req, res) => {
  try {
    const reviewId = req.params.id;

    await ReviewModel.updateOne(
      {
        _id: reviewId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        product: req.body.product,
        imageUrl: req.body.imageUrl,
        rating: req.body.rating,
        likes: req.body.likes,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update review",
    });
  }
};
