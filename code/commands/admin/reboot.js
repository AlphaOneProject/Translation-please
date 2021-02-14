var config = require("../../config.json");
const fs = require("fs");
var spawn = require("child_process").spawn;

module.exports = {
    name: "reboot",
    description: "Reboot the bot.",
    usage: "reboot",
    options: [],
    execute(message) {
        let local_path = __dirname.split('\\')
        let source_path = ""
        for (let i = 0; i < local_path.length - 2; i++) source_path += local_path[i] + '/'
        var child = spawn(source_path + 'start.bat', [], {
			detached: true,
			stdio: [ 'ignore', 'ignore', 'ignore' ]
		});
		child.unref();
		process.exit(0);
    },
};
