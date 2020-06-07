function getDate() {
    var d = new Date,
    dformat = 
        "[" + [
			d.getDate().padLeft(),
			(d.getMonth()+1).padLeft(),
			d.getFullYear()
		].join('/') + ' ' + [
			d.getHours().padLeft(),
			d.getMinutes().padLeft(),
			d.getSeconds().padLeft()
        ].join(':') + "] ";
    return d;
}