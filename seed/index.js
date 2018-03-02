require('dotenv').config()

const SpoofItem = require('./../app/spoof-item/spoof-item-model')
const { mongoose } = require('./../config/mongoose')
const Counter = require('./../app/counter/counter-model')

//Clear Collections to start new + add counter
const clearItems = SpoofItem.remove({}).then(result => {
  console.log('spoof items cleared')
})

//Clear Counters
const clearCounter = Counter.remove({}).then(result => {
  console.log('counters cleared')
})

const promises = [clearItems, clearCounter]

Promise.all(promises).then(() => {
  //Create new counter
  const counter = new Counter({
    _id: 'url_count',
    seq: 10000
  }).save()

  const img = 'https//unsplash.it/200/200'
  const titles = [
    'Oh my gosh, wow!',
    "You won't believe this!",
    'Man takes his squirrel on a walk WITH his dog.',
    'Donald Trump peed his pants.',
    'Man solves Rubiks cube with two arms!',
    'Last glass of water on Earth perishes'
  ]
  const descriptions = [
    'Put a bird on it taiyaki irony hexagon, godard crucifix roof party vexillologist typewriter stumptown gentrify pop-up squid +1 pinterest. Sustainable fixie taiyaki meditation green juice.',
    'Taiyaki +1 gluten-free organic. Hella fanny pack post-ironic XOXO pok pok thundercats, freegan irony truffaut poutine pour-over lo-fi disrupt hoodie williamsburg. Seitan umami adaptogen four loko, sustainable bushwick tbh gochujang listicle.',
    'PBR&B selvage ennui, la croix flannel art party twee occupy literally truffaut palo santo raw denim tumblr try-hard. VHS cred slow-carb yr la croix neutra bushwick coloring book four dollar toast air plant distillery.',
    'IPhone letterpress sustainable glossier. Brunch selvage kombucha, glossier VHS leggings tilde activated charcoal twee prism photo booth tofu cornhole pok pok. Flexitarian la croix vaporware humblebrag cray hot chicken. Yuccie asymmetrical mlkshk quinoa. Marfa snackwave pok pok chambray bespoke unicorn DIY celiac plaid next level. Roof party XOXO mustache hexagon, tacos marfa banjo hella gastropub kombucha iceland deep v small batch chartreuse tumblr.',
    'Shoreditch fanny pack bushwick celiac biodiesel, affogato ethical umami disrupt scenester banh mi locavore gochujang.',
    'Whatever vegan next level subway tile, vexillologist authentic crucifix green juice DIY chia tilde man braid. Woke helvetica biodiesel squid tbh heirloom synth narwhal forage.'
  ]
  const count = 15
  const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]
  const getRandomNumber = (num1, num2) => Math.floor(Math.random() * num2) + num1
  const imageSize = getRandomNumber(200, 400)

  for (let i = 0; i < count; i++) {
    //let name = randomstring.generate({ length: 8, charset: "alphabetic" });
    let spoofItem = new SpoofItem({
      desc: getRandomFromArray(descriptions),
      img: `http://unsplash.it/${imageSize}/${imageSize}`,
      title: getRandomFromArray(titles)
    })
    spoofItem.save(() => {}).catch(err => console.log(err))
  }

  setTimeout(() => {
    process.exit()
  }, 2500)
})
