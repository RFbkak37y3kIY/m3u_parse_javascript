"use strict";

var parserM3U = window.parserM3U = null;
window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');
	
	parserM3U = new ParserM3U();
	
	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			
			parserM3U.clearList();
			if(parserM3U.addDataAndParse(reader.result)){
				renderDOM(parserM3U.getList());
			} else {
				alert("Выбранный Вами файл не содержит формат M3U, \nВыберете другой файл пожалуйста");
			}
			
		}
		if(file) reader.readAsText(file);
	});

	function renderDOM(data){
		console.log(data)
		var outputHTML = "<table>";
		var s = "";
		var duration;
		for (var i = data.length - 1; i >= 0; i--) {

			switch (data[i].duration) {
				case "-1":
					duration = "Неизвестно"
					break;
				case "0":
					duration = "streem";
					break;
				default:
					duration = data[i].duration + " сек"
					// statements_def
					break;
			}
			s = "<tr>";
			s += "<td>" + data[i].title + "\n<br><a href=\"" + data[i].link + "\" target=\"_blank\">" + data[i].link + "</a></td>";
			s += "<td>" + duration + "</td>";
				s += "<td>";
				if(data[i].params){
					for(var attr_name in data[i].params){
						s += "<span><b>"+attr_name+":</b>"+data[i].params[attr_name]+"</span>";
					}
				}
				s += "</td>";
			s += "</tr>";
			outputHTML += s;
		}
		outputHTML += "</table>";
		
		document.getElementById('container').innerHTML = outputHTML;
	}
}
