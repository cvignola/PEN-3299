var cr = require('./collectiveRepository');

var host= process.argv[2];
var dir= process.argv[3];
var server= process.argv[4];

var encoded_dir= encodeURIComponent(dir);

var path= "/sys.was.collectives/local/hosts/"+host+"/userdirs/"+encoded_dir+"/servers/"+server+"/sys.status"; 

function setStarted() { 

console.log("Set STOPPED path="+path);


cr.setData(path,"STOPPED",function(body) { 
	console.log("setData: "+body);

        cr.getData(path, function(body) { 
	console.log("getData: "+body);

	}); });

};

setStarted();

