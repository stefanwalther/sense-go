
function init( plugins, tasksCfg ) {
	return {
		taskDirectory: './tasks', // the directory your tasks are stored in
		plugins: plugins,                 // the plugins to expose to your tasks
		filenameDelimiter: '',       // a character or string of characters to replace in task filenames
		taskDelimiter: '',           // a character or string of characters to insert in place of removed filenameDelimiter
		config: tasksCfg                   // an object to store configuration for use in tasks
	};
}
module.exports = init;