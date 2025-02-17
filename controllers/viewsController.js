const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

module.exports.getOverview = catchAsync(async (req, res, next) => {
    // Get tour data from collection
    const tours = await Tour.find();

    // Build template

    // Render that template using tour data from 1
    res.status(200).render('overview', {
        title: 'All Tours',
        tours,
    });
});

module.exports.getTour = catchAsync(async (req, res, next) => {
    // Get the data for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user',
    });

    // Build Template
    // Render template using data from tour variable
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour,
    });
});
