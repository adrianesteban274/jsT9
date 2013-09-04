var T9 = function(_wordList_) {

	//The root of the trie tree
	var root = {
		$ : false,
		branches : []
	};

	var wordList = _wordList_;

	/**
	 *	Starts the trie tree with the list of words
	 * 
	 * @constructor
	 */
	var init = function() {
		var auxBranch,
		subAuxBranch;

		// For each word in the list
		for(var _word_ in wordList) {
			auxBranch = root; //Get the current state of the tree

			var word = wordList[_word_]; //Get the current word to be added to the three

			//For each character of the current word
			for(var _ch_ in word) {
				var ch = word[_ch_]; //Get the current character of the word

				//If the branch don't have the word yet
				if(typeof auxBranch.branches[ch] === 'undefined') {
					auxBranch.branches[ch] = { //Adds a new leaf to the tree
						$ : false,
						branches : []
					};
				}
				auxBranch = auxBranch.branches[ch];

			}

			auxBranch.$ = true;

		}

	};

	/**
	 * Predict the words, given the initial word
	 * @param  {String} word The initial word
	 * @return {Array}      The array of Strings with the predicted words
	 */
	this.predict = function(word) {
		var auxBranch = root;

		//Goes through the tree until it finds the branch from
		//where it will begin to predict
		for(var _ch_ in word) {
			var ch = word[_ch_]; //Get the current character from the word

			//If the leaf branch with the current character exists
			if(typeof auxBranch.branches[ch] !== 'undefined') {
				auxBranch = auxBranch.branches[ch]; //Goes to the next branch
			}
			else {
				// console.log('Impossível prever');
				return [];
			}
		}

		var predictedList = exploreBranch(word, auxBranch);

		//TODO order the list

		return predictedList;

	};

	/**
	 * Goes trough the branch looking for the words that contain the word passed as parameter
	 * @param  {String} baseWord The base word of the current branch
	 * @param  {Object} branch   The current branch
	 * @return {Array}          List of predicted words
	 */
	var exploreBranch = function(baseWord, branch) {
		var predictedList = [];

		var keys = Object.keys(branch.branches); //Get the branch names that forks from the branch
		for(var _ch_ in keys) { //For each branch forking from the branch
			var ch = keys[_ch_]; //Get the leading character of the current branch
			
			if(branch.branches[ch].$ === true) { //If the current leaf ends a word, puts the word on the list
				predictedList.push(baseWord + ch);
			}

			//Recursively calls the function, passing the forking branches as parameter
			var predictedWords = exploreBranch(baseWord + ch, branch.branches[ch]);

			//Concatenates the predicted words to the list of predicted words
			predictedList =  predictedList.concat(predictedWords);

		}
		return predictedList;

	};

	//Calls the constructor
	init();

	return this;
};