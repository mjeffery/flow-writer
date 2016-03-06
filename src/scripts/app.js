$(document).ready(function() {	
	var TEXT_KEY = 'session-text';
	var text = localStorage.getItem(TEXT_KEY) || '';

	$(document).keydown(function() { 
		if((event.keyCode || event.which) == 8) event.preventDefault();
	});

	$(document).keypress(function(e) {
		var key = event.keyCode || event.which;
		var keyChar = String.fromCharCode(key);

		if(key == 8) { //supposedly this is backspace?
			//TODO make it rain!
		}
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

	$('.reset-btn').click(function() {
		var result = confirm('are you sure you want to delete your current text?');
		if(result) {
			text = '';
			//TODO save!
		}
	});

	$('.show-text-btn').click(function() {
		$('#all-text').text(text);
		$('.show-text-container').show();
	});

	$('.hide-text-btn').click(function() {
		$('.show-text-container').hide();
	})
});
