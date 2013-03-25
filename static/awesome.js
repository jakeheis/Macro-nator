$(document).ready(function(){
	$('textarea, input').keyup(function(){
		var all = $('#first').val()+"\nint main(void) {\n"+$('#second').val()+"\n} //Macro-Terminator";
		$.post("convertify", { file: all }, function(data) {
			$('#output').html(data);
		});
	});
});