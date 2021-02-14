var config = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "uptime",
    description: "Display the time elapsed since the bot's boot (reset upon reboot).",
    usage: "uptime",
    options: [],
    execute(client, message) {
        let uptime = client.uptime;
        let str = "Time elapsed since last boot: \`";
        str += `${Math.floor(uptime / (24 * 60 * 60 * 1000))}d`; uptime -= (24 * 60 * 60 * 1000) * Math.floor(uptime / (24 * 60 * 60 * 1000))
        str += ` ${Math.floor(uptime / (60 * 60 * 1000))}h`; uptime -= (60 * 60 * 1000) * Math.floor(uptime / (60 * 60 * 1000))
        str += ` ${Math.floor(uptime / (60 * 1000))}m`; uptime -= (60 * 1000) * Math.floor(uptime / (60 * 1000))
        str += ` ${Math.floor(uptime / 1000)}s`; uptime -= 1000 * Math.floor(uptime / 1000)
        str += ` ${uptime}ms\``;
        message.channel.send(str);
    },
};
