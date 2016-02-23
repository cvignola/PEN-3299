var cr = require('./collectiveRepository');

var cluster= process.argv[2];
var host= process.argv[3];
var userdir= process.argv[4];
var server= process.argv[5];

var encoded_dir= encodeURIComponent(userdir);

var serverPath= "/sys.was.collectives/local/hosts/"+host+"/userdirs/"+encoded_dir+"/servers/"+server; 

var serverTuple= host+","+encoded_dir+","+server; 

var clusterPath= "/sys.was.groups/types/cluster/"+cluster+"/sys.members/"+serverTuple;

var scalingMBean= serverPath+"/"+"sys.mbeans/WebSphere:feature=scalingMember,type=ScalingMember,name=ScalingMember/attributes/Enabled"; //=true 

var clusterMBean= serverPath+"/"+"sys.mbeans/WebSphere:feature=clusterMember,type=ClusterMember,name=ClusterMember/attributes/Name"; //=defaultCluster

var scalingFeature= serverPath+"/"+"sys.features/data/scalingMember/mode"; //=automatic
var scalingFeatureChild= serverPath+"/"+"sys.features/data/scalingMember/mode/child";

var clusterFeature= serverPath+"/"+"sys.features/data/clusterMember/name"; //=defaultCluster

cr.create(clusterPath,null, function(body) { 
	//console.log("create: "+body)
	
	console.log("Created "+clusterPath);


});

cr.create(scalingMBean,"true", function(body) { 
	//console.log("create: "+body)
	
	console.log("Created "+scalingMBean);


});

cr.create(scalingFeature,"automatic", function(body) { 
	//console.log("create: "+body)
	
	console.log("Created "+scalingFeature);


}); 

cr.create(scalingFeatureChild,"", function(body) { 
	//console.log("create: "+body)
	
	console.log("Created "+scalingFeatureChild);


}); 

cr.create(clusterFeature,cluster, function(body) { 
	//console.log("create: "+body)
	
	console.log("Created "+clusterFeature);


}); 
