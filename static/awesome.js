$(document).ready(function(){
	$(".alert").alert()

	var refresh = function() {
		console.log("MADE IT THIS FAR");
		var macro = $('#first').val();
		var macroLines = macro.split('\n');
		var finished_macro = ""
		for(var i = 0; i < macroLines.length; i++) {
			var line = macroLines[i];
			if (i == 0) {
				finished_macro += line+"/*\n";
			} else {
				finished_macro += "*/"+line+"/*\n";
			}
		}

		finished_macro += "*/"

		var all = "//MACRONATOR START\n"+finished_macro+"\n"+$('#second').val()+"\n//MACRONATOR END";
		$.post("convertify", { file: all }, function(data) {
			var better = "";
			var lines = data.split('\n');
			for(var i = 0; i < lines.length-3; i++){
				better += "<p>";
				var line = lines[i];
				better += line.substring(2, line.length-2);
				better += "</p>";
			}
			$('#output').html(better);
		});
	}

	$('textarea, input').keyup(function(){
		refresh();
	});

	$('#simple-btn').click(function () {
		$('#first').val("#define Addition(uno, duo) \n uno + duo");
		$('#second').val("Addition(1,2)");
		refresh();
	});

	$('#complex-btn').click(function () {
		$('#first').val("#define QLLazyLoad(class, property) \n -(class *)property { \n if (_##property) \n return _##property; \n class *newGuy = [[class alloc] init]; \n _##property = newGuy; \n return _##property; \n }}");
		$('#second').val("QLLazyLoad(NSMutableArray, burgers)");
		refresh();
	});

});