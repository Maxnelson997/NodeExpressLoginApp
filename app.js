var express = require('express');

var app = express();

var port = process.env.PORT || 8080;
var bookRouter = express.Router();

//STATIC DIRECTORIES//
app.use(express.static('public')); //public static directory       CSS
//app.use(express.static('src/views'));   //src/views static directory    HTML

app.set('views', './src/views');
app.set('view engine', 'ejs');

//JADE//
//HANDLEBARS//
/*
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('views' , '.hbs');   
*/

bookRouter.route('/Books')
    .get(function(req, res){
        res.send('ehllo books'); 
});

bookRouter.route('/single')
    .get(function(req, res){
        res.send('ehllo single book'); 
});

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function (req, res) {
    res.send('books');
});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});

