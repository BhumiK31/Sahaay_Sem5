const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.reviewee) filter.reviewee = req.query.reviewee;

    const reviews = await Review.find(filter)
      .populate('reviewer', 'name email')
      .populate('reviewee', 'name email')
      .populate('job', 'title');

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
