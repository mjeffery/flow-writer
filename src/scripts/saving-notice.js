(function(global) {
	var TIMEOUT = 1000;
	var timeout = null;

	function showSaveNotice() {
		if(timeout != null)  {
			clearTimeout(timeout);
		} 
		else {	
			$('#saving-notice').show();
		}

		timeout = setTimeout(hideSaveNotice, TIMEOUT);
	}

	function hideSaveNotice() {
		if(timeout == null) return;

		$('#saving-notice').hide();
		timeout = null;
	}

	global.showSaveNotice = showSaveNotice;
})(window);
