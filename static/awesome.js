$(document).ready(function(){
	$('textarea').keyup(function(){
		// $.get('convertify', function(data) {
			// $('#output').text(data);
		// });
		var all = $('#first').val()+"\nint main(void) {\n"+$('#second').val()+"\n} //Macro-Terminator";
		$.post("convertify", { file: all }, function(data) {
			$('#output').html(data);
		});
	});
});