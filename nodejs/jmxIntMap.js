/**
 * An encapulation of Map.js that can be used to convert
 * a Map into the JSON representation of a java.util.Map 
 * as used by jmxConnector.js.   
 */

var Map = require("./Map");

module.exports = JmxMap;

function JmxMap() {
 
	this.map = new Map();

function jmxMapEntry(key) {
	return { "key":key,"keyType": "java.lang.String", "value": "java.lang.Integer" } 
}

function insertIntoMap(jmxMap, key, value) {

	jmxMap.value[key]= value;
	jmxMap.type.entries.push(jmxMapEntry(key));

}

function jmxMap() {
	var jmxMap= {};
	var value= {};
	var type= {};
	var entries= [];

	jmxMap.value= value;
	jmxMap.type= type;

	jmxMap.type.className= "java.util.HashMap";
	jmxMap.type.simpleKey= true;
	jmxMap.type.entries= entries;
	
	return jmxMap;

}

JmxMap.prototype.getMap = function() {
	return this.map;
}

JmxMap.prototype.toJmxMap = function() {

	var _jmxMap= jmxMap();
	this.map.forEachKeyValuePair(function(key, value) { insertIntoMap(_jmxMap, key, value); }  );
	return _jmxMap;

}

JmxMap.prototype.value = function() {
        var map= this.toJmxMap();	
        //console.log("value="+map.value);	
	//console.log("type="+map.entries);	
	//console.log(JSON.stringify(map.value,null,2));
	return map.value;
}

JmxMap.prototype.type = function() { 
        var map= this.toJmxMap();
        //console.log("value="+map.value);	
        //console.log("type="+map.type);
	//console.log(JSON.stringify(map.type,null,2));	
	return map.type;
}

JmxMap.prototype.toJSON = function() {
	return JSON.stringify(this.toJmxMap(),null,2);
}


}

