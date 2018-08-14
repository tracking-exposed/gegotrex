function initialize() {
	console.log("initialize now");

	$.getJSON('/api/v1/results/gegotrex', function(data) {

		data = _.filter(data, function(o) {
			return _.size(o.companies);
		});
		data = _.orderBy(data, function(o) {
			return _.size(o.companies);
		});

		var html = "";
		_.each(data, function(entry, i) {
			html += [
				"<tr>", 
					"<td>" + (i + 1) + "</td>", 
					"<td>" + entry.href + "</td>",
					"<td>" + _.uniq(entry.cookies).join(',') + "</td>",
					"<td>" + entry.companies.join(',') + "</td>",
					"<td>" + entry.unrecognized.join(',') + "</td>",
				"</tr>"
			].join("");
		});
		$("#results").append(html);
	});
}

