function initialize() {
	console.log("initialize gegotrex.js");

    $("#expander").on('click', displayInfo);
    $("#more").on('click', displayInfo);

	$.getJSON('/campaign/SSL-results.json', function(ssl) {
	$.getJSON('/api/v1/results/gegotrex', function(data) {

		data = _.filter(data, function(o) {
			return _.size(o.companies);
		});
		data = _.orderBy(data, function(o) {
			return _.size(o.companies);
		});

        /* cleaning process */
        data = _.map(data, function(o) {
            o.href = o.href.replace(/^(http|https):\/\// ,'');
            var match = _.find(ssl, { site: o.href});

            if(!match) {
                o.ssl = false;
                return o;
            }

            o.description = match.description;
            return _.extend(o, match.sslstatus);
        });

        var data = _.map(_.groupBy(data, 'description'), function(matches, name) {
            // console.log(_.map(matches, 'test'));
            var element = _.first(_.orderBy(matches, 'javascripts'));
            element.sites = _.map(matches, 'href');
            return element;
        });

		var html = "";
		_.each(data, function(entry, i) {
			html += [
				"<tr>", 
					"<td>" + (i + 1) + "</td>", 
					"<td>" + entry.description + "</br><small>(" + _.size(entry.sites)  + " sites)</small></td>",
					"<td>" + 
                        ( _.size(entry.cookies) 
                            ?  '<span class="cookie">' + _.size(entry.cookies) + '</span> '
                            : '' )
                            + _.uniq(entry.cookies).join(',') + "</td>",
					"<td>" + 
					    ( _.size(entry.unrecognized) 
                            ?  '<span class="company">' + _.size(entry.unrecognized) + '</span> '
                            : '' )
                            + entry.companies.join(',') + "</td>",
					"<td>" +
                        ( _.isString(entry.sslGrade) ? '<b>' + entry.sslGrade + '</b>' : '<i>error</i>' )
                            + "</td>",
				"</tr>"
			].join("");
		});
		$("#results").append(html);

        /* the stats */
        var sslcount = _.countBy(data, function(entry) {
            return (entry.test === "ok");
        });

        $("#stats--amount").text(_.size(data));
        $("#stats--cookies").text(
            _.reduce(data, function(memo, entry) {
                memo += _.size(entry.cookies);
                return memo;
            }, 0)
        );
        $("#stats--companies").text(
            _.size(_.uniq(_.flatten(_.map(data, 'companies'))))
            + '/'
            + _.size(_.flatten(_.map(data, 'companies')))
        );
        $("#stats--ssl").text(sslcount['true'] + '/' + sslcount['false']);
	});
    }); /* one get inside of the other, because the SSL is still a glued hack */
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
