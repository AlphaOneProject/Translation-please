var config = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "eval",
    description: "Launch a command as a Node JS interface.",
    usage: "eval [--node_expression]",
    options: ["--node_expression: Any Node JS expression interpretable."],
    execute(message) {
        try {
            eval(message.content.slice(6));
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error trying to execute that (very special) command!\nWhich means you have a (very special) way to recover the error message.`);
        }
    },
};
