$(document).ready(function(){
	$('textarea, input').keyup(function(){
		var all = "//MACRONATOR START\n"+$('#first').val()+"\n"+$('#second').val()+"\n//MACRONATOR END";
		$.post("convertify", { file: all }, function(data) {
			var better = "";
			var lines = data.split('\n');
			for(var i = 1; i < lines.length-3; i++){
				better += "<p>";
				var line = lines[i]
				better += line.substring(2, line.length-2);
				better += "</p>";
			}
			$('#output').html(better);
		});
	});
});