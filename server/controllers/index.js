// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');
//const Cat = models.Cat;
const {Cat} = models;

const hostIndex = (req, res) => {
  let name = 'unknown';

  res.render('index', {
    currentName: name,
    title: 'Home',
    pageName: 'Home Page'
  });
};

const hostPage1 = (req, res) => {

};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const hostPage3 = (req, res) => {
  res.render('page3');
};

const getName = (req, res) => {

};

const setName = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname, lastname and beds are all required' });
  }
  
  const catData = {
    name: `${req.body.firstname} ${req.body.lastname}`,
    bedsOwned: req.body.beds,
  }; 

  const newCat = new Cat(catData);
  try{
    await newCat.save();
    return res.status(201).json({
      name: newCat.name,
      beds: newCat.bedsOwned,
    });
  }catch(err){
    console.log(err);
    return res.status(500).json({error: 'Failed to create cat' });
  }
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }
};

const updateLast = (req, res) => {
	
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  getName,
  setName,
  updateLast,
  searchName,
  notFound,
};
