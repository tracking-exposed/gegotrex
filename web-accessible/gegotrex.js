function initialize() {
	console.log("initialize gegotrex.js");

    $("#expander").on('click', displayInfo);
    $("#more").hide();

//	$.getJSON('/api/v1/results/gegotrex', function(data) {
	$.getJSON('/campaign/static.json', function(data) {

		data = _.filter(data, function(o) {
			return _.size(o.companies);
		});
		data = _.orderBy(data, function(o) {
			return _.size(o.companies);
		});

        /* cleaning process */
        data = _.map(data, function(o) {
            o.href = o.href.replace(/^(http|https):\/\// ,'');
            return o;
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


function displayInfo() {

    if($("#more").is(':visible')) {
        $("#expander").text("👁  info");
        $("#expander").addClass('open');
        $("#expander").removeClass('closed');
    } else {
        $("#expander").text("❌ info");
        $("#expander").removeClass('open');
        $("#expander").addClass('closed');
    }

    $("#more").toggle();
};
