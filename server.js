// load environment
var Habitat = require( 'habitat' );
Habitat.load();
var env = new Habitat();

// load express app
var express = require( 'express' );
var app = express();

// simple status route
app.get( '/healthcheck', function( req, res ) {
	res.json({
		version: require( './package.json' ).version,
		http: 'okay'
	});
});

// deal with rules from environment
if( env.get( 'rule' ) ) {
	Object.keys( env.get( 'rule' ) ).forEach( function( ruleKey ) {
		var rule = env.get( 'rule_' + ruleKey ).split( /\s*>\s*/ );

		app.get( rule[ 0 ], function( req, res ) {
			res.redirect( rule[ 1 ] );
		});
	});
}

// spin up server
var server = app.listen( env.get( 'port' ) || 3000, function() {
	console.log( 'Listening on port %d', server.address().port );
});
