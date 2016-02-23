/**********************************
 * CollectiveRepository functions *
 **********************************/

var jmxConnector = require('./jmxConnector');
var util = require("util");

var objectName= "WebSphere:feature=collectiveController,type=CollectiveRepository,name=CollectiveRepository";
var url= "/IBMJMXConnectorREST/mbeans/"+encodeURIComponent(objectName);

/*
 * Exported functions
 * 1. create
 * 2. getData
 * 3. setData
 * 4. getChildren
 * 5. getDescendantData
 * 6. allocateDeployVariables
 * 7. releaseDeployVariables 
 */

exports.create= function getData(path, data, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(path, "java.lang.String");
	payload.signature[0]= "java.lang.String";
	payload.params[1]= addParm(data, "java.lang.String");
	payload.signature[1]= "java.lang.Object";

	doPost(url+"/operations/create", payload, callback);
}



exports.getData= function getData(path, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(path, "java.lang.String");
	payload.signature[0]= "java.lang.String";

	doPost(url+"/operations/getData", payload, callback);
}

exports.setData= function setData(path, data, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(path, "java.lang.String");
	payload.signature[0]= "java.lang.String";
	payload.params[1]= addParm(data, "java.lang.String");
	payload.signature[1]= "java.lang.Object";

	doPost(url+"/operations/setData", payload, callback);
}

exports.getChildren= function getChildren(path, absolute, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(path, "java.lang.String");
	payload.signature[0]= "java.lang.String";

	payload.params[1]= addParm(absolute, "java.lang.Boolean");
	payload.signature[1]= "boolean";

	doPost(url+"/operations/getChildren", payload, callback);
}

exports.getDescendantData= function getDescendantData(path, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(path, "java.lang.String");
	payload.signature[0]= "java.lang.String";

	doPost(url+"/operations/getDescendantData", payload, callback);
}

exports.registerMember= function registerMember(heartBeatInterval, memberData, callback) {

	var payload= cleanPayload();
	
	payload.params[0]= addParm(heartBeatInterval, "java.lang.Integer");
	//console.log("CPV begin");
	//console.log(util.inspect(memberData.value(), {showHidden: false, depth: null}));
	//console.log(util.inspect(memberData.type(), {showHidden: false, depth: null}));
	//console.log("CPV end");
	//console.log("CPV: "+memberData.value());
	//console.log("CPV: "+memberData.type());
	payload.params[1]= addParm(memberData.value(), memberData.type());
//console.log("CPV: payload="+JSON.stringify(payload));	
	payload.signature[0]= "int";
	payload.signature[1]= "java.util.Map";
	

	
	console.log("CPV: payload: "+	JSON.stringify(payload,null,4));
	
	doPost(url+"/operations/registerMember", payload, callback);
}

exports.sendHeartBeat= function sendHeartBeat(memberId, callback) {

	var payload= cleanPayload();
	
	payload.params[0]= addParm(memberId, "java.lang.String");
	
	payload.signature[0]= "java.lang.String";
	
	doPost(url+"/operations/sendHeartBeat", payload, callback);
}

exports.allocateDeployVariables= function allocateDeployVariables(host, variables, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(host, "java.lang.String");
	payload.signature[0]= "java.lang.String";

	payload.params[1]= addParm(variables, "[Ljava.lang.String;");
	payload.signature[1]= "[Ljava.lang.String;";

	doPost(url+"/operations/allocateDeployVariables", payload, callback);
}

// variables must be a JmxIntMap 
exports.releaseDeployVariables= function releaseDeployVariables(host, variables, callback) { 

	var payload= cleanPayload();
	payload.params[0]= addParm(host, "java.lang.String");
	payload.signature[0]= "java.lang.String";

	payload.params[1]= addParm(variables.value(), variables.type());
	payload.signature[1]= "java.util.Map";

	doPost(url+"/operations/releaseDeployVariables", payload, callback);
}

/*
 * Internal helper functions 
 */

function cleanPayload() { 
	var payload= {};
	payload.params= [];
	payload.signature= [];
	return payload;
}

function addParm(value, type, signature) { 
	var params= {};
	params.value = value; 
	params.type = type;
	return params;
}

function doPost(url, payload, callback) { 
	// do post below 
	//console.log("CPV: payload2="+payload[0]);
	jmxConnector.simplePOST(
		JSON.stringify(payload),
		url,
		function(res, d) {
				callback(d);
		}, 
		function(e) {
			console.error(e);
		});
}
