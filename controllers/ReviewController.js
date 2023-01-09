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
      message: "Failed to get review",
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
      reviewTitle: req.body.reviewTitle,
      reviewExtract: req.body.reviewExtract,
      reviewContent: req.body.reviewContent,
      productTitle: req.body.productTitle,
      category: req.body.category,
      reviewImageUrl: req.body.reviewImageUrl,
      rating: req.body.rating,
      likes: req.body.likes,
      grades: req.body.grades,
      tags: req.body.tags,
      user: req.userId,
      _id: req._id,
      comments: req.comments,
      createdAt: req.createdAt,
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
        reviewTitle: req.body.reviewTitle,
        reviewExtract: req.body.reviewExtract,
        reviewContent: req.body.reviewContent,
        productTitle: req.body.productTitle,
        category: req.body.category,
        reviewImageUrl: req.body.reviewImageUrl,
        rating: req.body.rating,
        likes: req.body.likes,
        grades: req.body.grades,
        tags: req.body.tags,
        user: req.userId,
        _id: req._id,
        comments: req.body.comments,
        createdAt: req.createdAt,
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
