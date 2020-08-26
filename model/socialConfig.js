var port = process.env.PORT || 3000;
//if(port !== 3000) {
//    googleUrl = 'http://onetime1.herokuapp.com/login/google/callback';
//    facebookUrl = 'http://onetime1.herokuapp.com/login/facebook/callback';
//    twitterUrl = 'http://onetime1.herokuapp.com/login/twitter/callback';
//} else {
    googleUrl = 'http://localhost:3000/login/google/callback';
    facebookUrl = 'http://localhost:3000/login/facebook/callback';
    twitterUrl = 'http://127.0.0.1:3000/login/twitter/callback';
//}

module.exports = {
    google: {
        'clientID': '621124433120-j2hv4rt1mnsigemp1ktajh35ojbugvg6.apps.googleusercontent.com',
        'clientSecret': 'hdPeS34CwVXSSSvgXu2ueDxK',
        'callbackURL': googleUrl
    },
    fb: {
        'appID': '888508431235806',
        'appSecret': '64b53037c315d95586be39e9e9d49161',
        'callbackUrl': facebookUrl
    },
    twitter: {
        'apikey': '9I081pFvS4nePQJkaZOPvlCFA',
        'apisecret': 'FTeMT7oYxEm1mQtn3OO1aJ3JT3rP9BMWEzso6m70fQdALEkgO6',
        'callbackUrl': twitterUrl
    }
};