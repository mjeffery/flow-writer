$(document).ready(function() {
	
	var text = '';

	$(document).keypress(function(e) {
		var key = event.keyCode || event.which;
		var keyChar = String.fromCharCode(key);

		if(key == 13) { // supposedly this is enter?
			text += '\n';
			$('#last-letter-display').text(' ');
		}
		else {
			text += keyChar;
			$('#last-letter-display').text(keyChar);
		}

		var wordCount = text.split(/\S+/g).length;
		$('#word-count-display').text(wordCount);

		e.preventDefault();
	});
});
