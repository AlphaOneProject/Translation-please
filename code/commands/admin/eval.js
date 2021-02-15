module.exports = {
    name: "eval",
    description: "Launch a command as a Node JS interface.",
    usage: "eval [--node_expression]",
    options: ["--node_expression: Any Node JS expression interpretable."],
    execute(message) {
        let msg = message;
        console.log(message.content);
        try {
            if (message.content.includes("require") || message.content.includes("process") || message.content.slice(6).includes("eval")) throw new Error("Require & Process restricted for security reasons.");
            let ret_val = eval(message.content.slice(6));
            if (ret_val != undefined && typeof ret_val.then !== "function" && ret_val != "") message.channel.send("```" + ret_val + "```\n");
        } catch(error) {
            console.log(error);
            if (error.message == "Require & Process restricted for security reasons.") message.channel.send(error.message);
            else message.channel.send(`There was an error trying to execute that (very special) command!\nWhich means you have a (very special) way to recover the error message.`);
        }
    },
};
