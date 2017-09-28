"use strict";
/*
	M3U - парсер для работы с данными

	@param data - данные из файла и/или других источников в виде текстового не обработанного содержания

	using:

	var instance = new ParserM3U(stringDataM3Uformat);
	console.log( instance.getList() );
	
	// or
	
	var instance = new ParserM3U();
	instance.addDataAndParse(stringDataM3Uformat);
	console.log( instance.getList() );
	

*/

/* Class ParserM3U */
var ParserM3U = function(data){
	/* private property */
	var _arrList = [];
	var EXTM3U = '#EXTM3U';
	var EXTINF = 'EXTINF:';
	
	/* private methods */
	function parse(data) {
		if (!data) {
			console.warn('ParserM3U::parse() param "data" is empty');
			return false;
		}
		var arrRows = data.split("\n#");
		if(arrRows[0].indexOf(EXTM3U) != 0) {
			return false;
		}
		for(var item in arrRows){
			if(arrRows[item].indexOf(EXTM3U) == -1) {
				_arrList.push(parseRow(arrRows[item]));
			}
		}
		return true;
	}
	function parseRow(strRow){
		var rows = strRow.split("\n");
		var obj = {};
		if(rows[0].indexOf(EXTINF) != -1){
			var arrFirstRow = rows[0].split(EXTINF);
			var arrData = rows[0].split(EXTINF)[1].split(",");
			var params = arrData[0].split(" ");
			var duration = params[0];
			delete params[0];
			var obj = {
				duration: duration,
				title: arrData[1],
				link: rows[1],
			}
			if(params.length > 1){
				console.log(params)
				obj.params = {};
				for (var i = params.length - 1; i >= 0; i--) {
					if(!params[i]) continue;
					var attr_name = params[i].split("=")[0],
						attr_value = params[i].split("=")[1];
					obj.params[attr_name] = attr_value.replace(/"*/g, '');
				}
			}
		}
		return obj;
	}

	/* public methods */
	this.getItem = function(index) {
		return _arrList[index];
	}
	this.getList = function() {
		return _arrList;
	}
	this.clearList = function(){
		_arrList = [];
	}
	this.addDataAndParse = function(data){
		return parse(data);
	}
	this.getLength = function(){
		return _arrList.length;
	}
}