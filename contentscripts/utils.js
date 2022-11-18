function keybindingMatches(keybinding, theEvent){
	return keybinding.ctrlKey == theEvent.ctrlKey 
		&& keybinding.altKey == theEvent.altKey
		&& keybinding.shiftKey == theEvent.shiftKey
		&& keybinding.key == theEvent.key;
}

