
// Build Bar Graph
function buildBarGraph(sampleID) {
    // This comes from office hours with Dom
    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var trimmedArray = samples.filter(s => s.id === sampleID);
        var result = trimmedArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Species Found",
            margin: { t: 30, l: 150 }
        }

        var barArray = [barData];

        var config = { responsive: true }

        Plotly.newPlot("bar", barArray, barLayout, config);
    });
}

// Build bubble chart
function buildBubbleChart(sampleID) {

    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var trimmedArray = samples.filter(s => s.id === sampleID);
        var result = trimmedArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            autosize: true,
            marker: {
                color: otu_ids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: sample_values,
            }
        };

        var data = [trace1];

        var layout = {
            showlegend: false,
            xaxis: {
                title: "OTU ID",
            }
        };

        var config = { responsive: true }

        Plotly.newPlot('bubble', data, layout, config);

    });
}

// Populate Demographic Info panel and handle null values
function ShowMetaData(sampleID) {

    d3.json("samples.json").then(data => {

        var meta = data.metadata;
        var trimmedArray = meta.filter(s => s.id.toString() === sampleID);
        var result = trimmedArray[0];

        select = d3.select("#sample-metadata");
        select.html(""); // clear panel before re-populating

        Object.entries(result).forEach(function ([key, value]) {
            if (!!value) {
                select.append("p").append("strong").text(`${key}: ${value}`);
            }
            else {
                select.append("p").append("strong").text(`**${key} not given`);
            };
        });
    });
}

// Initialize dashboard
function initDashboard() {

    d3.json("samples.json").then(data => {

        var samples = data.samples;
        subjectIDs = [];

        samples.forEach(function (sample) {
            subjectIDs.push(sample.id);
        });

        var initID = subjectIDs[0];

        //Populate dropdown menu with IDs
        var select = document.getElementById("selDataset");

        for (var i = 0; i < subjectIDs.length; i++) {

            var id = subjectIDs[i];

            var option = document.createElement("option");
            option.text = id;
            option.value = id;

            select.add(option);
        };
        buildBarGraph(initID);
        buildBubbleChart(initID);
        ShowMetaData(initID);
    });
}

initDashboard();

// Function to handle changes in dropdown menu
function optionChanged(newID) {

    buildBarGraph(newID);
    buildBubbleChart(newID);
    ShowMetaData(newID);
}