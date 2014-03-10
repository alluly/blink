
module.exports = function(app){

    app.get('/login', function(req, res){
        res.render('login', {
            title: 'Express Login'
        });
    });
    
    app.get('/kelp.txt', function(req, res) {
		res.send('kelp');
	});
	
	app.get('/', function(req, res) {
		if (req.isAuthenticated()) {
			res.send('Hello' + req.username);
		} else {
			res.send('it\'s gonna take a lotta loveee');
		}
	});
	
	app.post('/signup', function(req, res) {
		console.log(req);
		var newUser = new app.User({
			username: req.body.username,
			password: req.body.password,
			name:     req.body.name,
			school:   req.body.school
		});
		newUser.save(function(err) {
			if (err) {
				res.send(err);
			}
		});	
	});
	
	
}