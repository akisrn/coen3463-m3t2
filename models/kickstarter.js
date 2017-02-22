// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var kickstarterSchema = new Schema({
  project_name: {
                  type: String,
                  required: true
                },
  raised_amount: {
                  type: String, 
                  required: true
                 },
  funding_date: {
                  type: String,
                  required: true
                },
  website: {
            type: String,
            required: true
           },
  kickstarter_page: {
                      type: String,
                      required: true
                    },
  kickstarter_fund: {
                      type: String,
                      required: true
                    },
  youtube_link: {
                  type: String,
                  required: true
                },
  location: {
              type: String,
              required: true
            },
  category: {
              type: String,
              required: true
            },
  backer_count: {
                  type: String,
                  required: true
                },
  launch_date: {
                type: String,
                required: true
               },
  social_pages: {
                  type: String,
                  required: true
                },
  created_at: Date,
  updated_at: Date
});

  kickstarterSchema.path('project_name').validate(function (v) {
  return v.length > 5;
}, 'my error type'); 

  // on every save, add the date
  kickstarterSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    
    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;

    next();
  });

var Kickstarter = mongoose.model('Kickstarter', kickstarterSchema);

// make this available to our users in our Node applications
module.exports = Kickstarter;