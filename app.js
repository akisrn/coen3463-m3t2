var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var dataToSave;
var projectname;
var raisedamount;
var fundingdate;
var website;
var kickstarterpage;
var kickstarterfund;
var youtubelink;
var location;
var category;
var backercount;
var launchdate;
var socialpages;
var datecreated;
var dateupdated;
var kickstarterName;

var mdbUrl = "mongodb://admin:password@ds145168.mlab.com:45168/kickstarters"
MongoClient.connect(mdbUrl, function(err, database) {
    if (err) {
        console.log(err)
        return;
    }

    console.log("Connected to DB!");

    // set database
    db = database;

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', index);

    app.post('/', function(req, res, next) {
         res.redirect('/');
    });

    //New Entry
    app.get('/new', function(req, res, next) {
         res.render('new', { title: 'New Entry' });
    });

    //Kickstarters List
    app.post('/kickstarters', function(req, res) {
        var kickstarterCollection = db.collection('kickstarters');
        kickstarterCollection.find().toArray(function(err, kickstarters) {
           console.log('kickstarters loaded', kickstarters);
          res.render('kickstarters', {
            kickstarters: kickstarters
          });
        })
    });

    //Kickstarters List
    app.get('/kickstarters', function(req, res) {
        var kickstarterCollection = db.collection('kickstarters');
        kickstarterCollection.find().toArray(function(err, kickstarters) {
           console.log('kickstarters loaded', kickstarters);
          res.render('kickstarters', {
            kickstarters: kickstarters
          });
        })
    });

    //To Home
    app.post('/new', function(req, res, next) {
         res.render('new', { title: 'New Entry' });
    });

    //Edit New Entry
    app.post('/edit', function(req, res, next) {
         res.render('edit', { datecreated: req.body.date_created,
                              dateupdated: req.body.date_created,
                              projectname: projectname,
                              raisedamount: raisedamount,
                              fundingdate: fundingdate,
                              website: website,
                              kickstarterpage: kickstarterpage,
                              kickstarterfund: kickstarterfund,
                              youtubelink: youtubelink,
                              location: location,
                              category: category,
                              backercount: backercount,
                              launchdate: launchdate,
                              socialpages: socialpages
                             });
         dataToSave = req.body;
    });

    //Preview Entry
    app.post('/preview', function(req, res) {       
         //load input data
         res.render('preview', {datecreated: req.body.date_created,
                                dateupdated: req.body.date_created,
                                projectname: req.body.project_name,
                                raisedamount: req.body.raised_amount,
                                fundingdate: req.body.funding_date,
                                website: req.body.website,
                                kickstarterpage: req.body.kickstarter_page,
                                kickstarterfund: req.body.kickstarter_fund,
                                youtubelink: req.body.youtube_link,
                                location: req.body.location,
                                category: req.body.category,
                                backercount: req.body.backer_count,
                                launchdate: req.body.launch_date,
                                socialpages: req.body.social_pages
                              });;

         dataToSave = req.body;
         datecreated = req.body.date_created;
         dateupdated = req.body.date_created;
         projectname = req.body.project_name;
         raisedamount = req.body.raised_amount;
         fundingdate = req.body.funding_date;
         website = req.body.website;
         kickstarterpage = req.body.kickstarter_page;
         kickstarterfund = req.body.kickstarter_fund;
         youtubelink = req.body.youtube_link;
         location = req.body.location;
         category = req.body.category;
         backercount = req.body.backer_count;
         launchdate = req.body.launch_date;
         socialpages = req.body.social_pages;
    });

    //Submit Entry
    app.post('/submit', function(req, res) {
         console.log(dataToSave);
         db.collection('kickstarters')
          .save(dataToSave, function(err, kickstarter) {
            if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successfull!");
            res.redirect('/new');
         })
    });

    //Kickstarter Page
    app.get('/kickstarter/:kickstarterId', function(req, res) {
        var kickstarterId = req.params.kickstarterId;
        var kickstarterCollection = db.collection('kickstarters');
        kickstarterCollection.findOne({ _id: new ObjectId(kickstarterId) }, function(err, kickstarter) {
            res.render('kickstarter', {
                kickstarter: kickstarter
            });
        });
    });

    //Kickstarter Page
    app.post('/kickstarter/:kickstarterId', function(req, res) {
        var kickstarterId = req.params.kickstarterId;
        var kickstarterCollection = db.collection('kickstarters');
        kickstarterCollection.findOne({ _id: new ObjectId(kickstarterId) }, function(err, kickstarter) {
            res.render('kickstarter', {
                kickstarter: kickstarter
            });
        });
    });

    //Call Update Page
    app.post('/kickstarter/:kickstarterId/update', function(req, res) {
        var kickstarterName = req.body.kickstarter_id;
        console.log(kickstarterName)
        var kickstarterCollection = db.collection('kickstarters');
        kickstarterCollection.findOne({ _id: new ObjectId(kickstarterName) }, function(err, kickstarter) {
            res.render('update', {
                kickstarter: kickstarter
            });
        });
    });

    //Save Update Entry
    app.post('/kickstarter/:kickstarterId/save', function(req, res) {
         kickstarterName = req.body.kickstarter_id
         console.log(kickstarterName);
         var updatedEntry = {
                              'project_name': req.body.project_name,
                              'raised_amount': req.body.raised_amount,
                              'funding_date': req.body.funding_date,
                              'website': req.body.website,
                              'kickstarter_page': req.body.kickstarter_page,
                              'kickstarter_fund': req.body.kickstarter_fund,
                              'youtube_link': req.body.youtube_link,
                              'location': req.body.location,
                              'category': req.body.category,
                              'backer_count': req.body.backer_count,
                              'launch_date': req.body.launch_date,
                              'social_pages': req.body.social_pages                        
                            }

         var kickstarterCollection = db.collection('kickstarters');
         kickstarterCollection.updateOne({"_id": ObjectId(kickstarterName)}, {$set: updatedEntry}, function(err, result) {
                                            if (err)
                                             {
                                                console.log("Updating Data Failed");
                                                return;
                                             }
                                          console.log("Updating Data Successfull!");
                                          console.log(req.body.project_name);
                                          res.redirect('/')

                                          });
    });


    //Delete Entry
    app.post('/kickstarter/:kickstarterId/delete', function(req, res) {
         kickstarterName = req.body.kickstarter_id
         var kickstarterCollection = db.collection('kickstarters');
         kickstarterCollection.remove({"project_name":kickstarterName});
         console.log('Entry Deleted');
         res.redirect('/');
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
});


module.exports = app;
