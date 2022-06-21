const { strict } = require("assert");

Number.prototype.padLeft = function(base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0? new Array(len).join(chr || '0') + this : this;
}

module.exports = {
	get_formatted_date : function() {
		var d = new Date,
		formatted_date = 
			"[" + [
				d.getDate().padLeft(),
				(d.getMonth()+1).padLeft(),
				d.getFullYear()
			].join('/') + ' ' + [
				d.getHours().padLeft(),
				d.getMinutes().padLeft(),
				d.getSeconds().padLeft()
			].join(':') + "] ";
		return formatted_date;
	}
};