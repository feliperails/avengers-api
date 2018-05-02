var home = require('../app/controllers/home');
var HeroController = require('../app/controllers/hero');

//you can include all your controllers
module.exports = function (app, passport) {
    var heroController = new HeroController();
    app.get('/hero', heroController.all);
    app.get('/hero/:id', heroController.getHero);
}