var config = require("../../config.json");
const fs = require("fs");

const time_units = {
    "d": (24 * 60 * 60 * 1000),
    "h": (60 * 60 * 1000),
    "m": (60 * 1000),
    "s": 1000,
    "ms": 1
}

module.exports = {
    name: "uptime",
    description: "Display the time elapsed since the bot's boot (reset upon reboot).",
    usage: "uptime",
    options: [],
    execute(client, message) {
        let uptime = client.uptime;
        let str = "Time elapsed since last boot: \`";
        for (const unit of Object.keys(time_units)) {
            str += ` ${Math.floor(uptime / time_units[unit])}${unit}`;
            uptime -= time_units[unit] * Math.floor(uptime / time_units[unit])
        }
        str += `\``;
        message.channel.send(str);
    },
};
