const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  console.log(req);
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const arrayOfBeers = await punkAPI.getBeers();
    res.render('beers', { arrayOfBeers: arrayOfBeers });
  } catch (error) {
    console.log(error);
  }
});
app.get('/beers/beer-:id', async (req, res) => {
  const beer = await punkAPI.getBeer(req.params.id);
  console.log(req.params);
  res.render('beer', { beer: beer });
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    // console.log(randomBeer);
    res.render('random-beer', { randomBeer: randomBeer });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
