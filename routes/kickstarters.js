var express = require('express');
var router = express.Router();
var moment = require('moment');
var Kickstarter = require('../models/kickstarter');

var newProject;
var projectToSave;


router.use(function(req, res, next)
 {
  if (!req.user)
   {
      res.redirect('/auth/login')
   }
  next();
 });

router.get('/list', function(req, res)  // Load all entries
 {
    if (!req.user)
     {
        res.redirect('/auth/login')
     }
    else
     {
        Kickstarter.find(function(err, kickstarters)
         {
            if (err)
             { throw err; }
            else
             {
               res.render('list', { kickstarters: kickstarters,
                                    user: req.user
                                  });
             }
         });
     }
 });
router.post('/list', function(req, res)  // Load all entries
 {
    if (!req.user)
     {
        res.redirect('/auth/login')
     }
    else
     {
        Kickstarter.find(function(err, kickstarters)
         {
            if (err)
             { throw err; }
            else
             {
               res.render('list', { kickstarters: kickstarters,
                                    user: req.user
                                  });
             }
         });
     }
 });

router.post('/new', function(req, res, next) //Get New Entry Form
 {
    res.render('add', {title: 'New Entry',
                       user: req.user
                      });
 });
router.get('/new', function(req, res, next) //Display New Entry Form
 {
    res.render('add', {title: 'New Entry',
                       user: req.user
                      });
 });

router.post('/preview', function(req, res) //Display Information Preview
 {
    newProject = Kickstarter({ project_name: req.body.project_name,
                               raised_amount: req.body.raised_amount,
                               funding_date: req.body.funding_date,
                               website: req.body.website,
                               kickstarter_page: req.body.kickstarter_page,
                               kickstarter_fund: req.body.kickstarter_fund,
                               youtube_link: req.body.youtube_link,
                               location: req.body.location,
                               category: req.body.category,
                               backer_count: req.body.backer_count,
                               launch_date: req.body.launch_date,
                               social_pages: req.body.social_pages
                             });

    projectToSave = newProject;
    res.render('preview', {newProject: newProject,
                           user: req.user
                          });
 });

router.post('/edit', function(req, res) //Edit Information Preview
 {
    res.render('edit', { project_name: projectToSave.project_name,
                         raised_amount: projectToSave.raised_amount,
                         funding_date: projectToSave.funding_date,
                         website: projectToSave.website,
                         kickstarter_page: projectToSave.kickstarter_page,
                         kickstarter_fund: projectToSave.kickstarter_fund,
                         youtube_link: projectToSave.youtube_link,
                         location: projectToSave.location,
                         category: projectToSave.category,
                         backer_count: projectToSave.backer_count,
                         launch_date: projectToSave.launch_date,
                         social_pages: projectToSave.social_pages,
                         user: req.user
                       });
 });

router.post('/add', function(req, res) //Add New Entry
 {
    projectToSave.save(function(err)
     {
       if (err)
         {
            console.log(err);
            return res.render('add', {errorLog: err.toString().substring(err.toString().indexOf(":") + 1)});
         }
       else
         {
            console.log('Entry created!');
            res.redirect('/kickstarters/new');
         }
     });
 });

router.get('/:kickstarterId', function(req, res) //Display Information Page
 {
    var kickstarterId = req.params.kickstarterId;
    Kickstarter.findById(kickstarterId, function(err, kickstarter)
     {
        if (err)
          { throw err; }
        else
         {
           res.render('kickstarter', {kickstarter: kickstarter,
                                      user: req.user
                                     });
         }
              
     });
 });

router.post('/:kickstarterId/update', function(req, res) // Update Information Page
 {
    var kickstarterId = req.body.kickstarter_id;
    Kickstarter.findById(kickstarterId, function(err, kickstarter)
     {
        if (err)
          { throw err; }
        else
         {
            res.render('update', {kickstarter: kickstarter});
         }
     });
 });

router.post('/:kickstarterId/save', function(req, res) // Save \
 {
    var kickstarterId = req.body.kickstarter_id;
    Kickstarter.findById(kickstarterId, function(err, kickstarter)
     {
        if (err)
         { throw err; }
        else
         {
            kickstarter.project_name = req.body.project_name,
            kickstarter.raised_amount = req.body.raised_amount,
            kickstarter.funding_date = req.body.funding_date,
            kickstarter.website = req.body.website,
            kickstarter.kickstarter_page = req.body.kickstarter_page,
            kickstarter.kickstarter_fund = req.body.kickstarter_fund,
            kickstarter.youtube_link = req.body.youtube_link,
            kickstarter.location = req.body.location,
            kickstarter.category = req.body.category,
            kickstarter.backer_count = req.body.backer_count,
            kickstarter.launch_date = req.body.launch_date,
            kickstarter.social_pages = req.body.social_pages

            kickstarter.save(function(err)
             {
                if (err)
                 {
                    console.log(err);
                    return res.render('register', {errorLog: err.toString().substring(err.toString().indexOf(":") + 1)});
                 }
                else
                 {
                    console.log('Update success!');
                    console.log(kickstarter.funding_date)
                    res.redirect('/kickstarters/' + req.body.kickstarter_id);
                 }
             });
           }
     });
 });

router.post('/:kickstarterId/delete', function(req, res) // Delete Entry
 {
    var kickstarterId = req.body.kickstarter_id;
    Kickstarter.findByIdAndRemove(kickstarterId, function(err, kickstarter)
     {
        if (err)
         { throw err; }
        else
         {
            console.log('Delete success!');
            res.redirect('/kickstarters/list');
         }
     });
 });

module.exports = router;
