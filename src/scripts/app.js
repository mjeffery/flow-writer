$(document).ready(function() {	
	var TEXT_KEY = 'session-text';
	var text = localStorage.getItem(TEXT_KEY) || '';

	if(text.length > 0) {
		updateWordCount();
		var lastLetter = text.charAt(text.length - 1);
		if(['\n', '\t'].indexOf(lastLetter) > -1)
			lastLetter = ' ';

		$('#last-letter-display').text(lastLetter);
	}

	var save = _.debounce(function() {
		showSaveNotice();
		localStorage.setItem(TEXT_KEY, text);
	}, 1000, { maxWait: 10000 });

	function addLetter(char, display) {
		text += char;
		$('#last-letter-display').text(display || char);
		updateWordCount();
		save();
	}

	function updateWordCount() {
		var wordCount = text.split(/\S+/g).length;
		$('#word-count-display').text(wordCount);
	}

	$(document).keydown(function(e) { 
		var key = e.keyCode || e.which;
		if(key == 8) { // handle backspace
			e.preventDefault();
		}
		else if(key == 9) { // handle tab
			addLetter('\t', ' ');
			e.preventDefault();
		}
	});

	$(document).keypress(function(e) {
		var key = e.keyCode || e.which;
		var keyChar = String.fromCharCode(key);

		if(key == 8) { //supposedly this is backspace?
			//TODO make it rain!
		}
		else if(key == 13) { // supposedly this is enter?
			addLetter('\n', ' ');
		}
		else {
			addLetter(keyChar);
		}

		e.preventDefault();
	});

	$('.reset-btn').click(function() {
		var result = confirm('are you sure you want to delete your current text?');
		if(result) {
			text = '';
			$('#all-text').text('');
			$('#last-letter-display').text('');
			$('#word-count-display').text(0);

			localStorage.setItem(TEXT_KEY, text);
		}
	});

	$('.show-text-btn').click(function() {
		$('#all-text').text(text);
		$('.show-text-container').show();
	});

	$('.hide-text-btn').click(function() {
		$('.show-text-container').hide();
	});
});
