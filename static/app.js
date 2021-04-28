
function buildBarGraph(sampleID) {

    // Build Bar Graph
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
            margin: {t: 30, l: 150}
        }

        var barArray = [barData];

        Plotly.newPlot("bar", barArray, barLayout);
    });
}
//Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

function buildBubbleChart(sampleID) {

    d3.json("samples.json").then(data => {
        console.log(data)

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
              size: sample_values
            }
          };
          
          var data = [trace1];
          
          var layout = {
            showlegend: false,
            // autosize: true,
            xaxis: {
                title: "OTU ID",
                
            }
          };

          
          
          Plotly.newPlot('bubble', data, layout);   
    
    });
}

function ShowMetaData(sampleID) {

    d3.json("samples.json").then(data => {
    
    });

}

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

            var opt = subjectIDs[i];

            var el = document.createElement("option");
            el.text = opt;
            el.value = opt;

            select.add(el);
        };
        buildBarGraph(initID);
        buildBubbleChart(initID);
        // ShowMetaData(initID);
    });
}

initDashboard();

function optionChanged(newID) {
    // var dropdownMenu = d3.select("#selDataset");
    // var selectedID = dropdownMenu.property("value");
    buildBarGraph(newID);
    buildBubbleChart(newID);
    // ShowMetaData(newID);
}