
d3.json("samples.json").then((data) => {

    console.log(data)
    var samples = data.samples;
    console.log(samples)

    otuIDs = [];
    sampleValues = [];
    otuLabels = [];
    subjectIDs = [];

    var sortedValues = samples.sort((a, b) => b.sample_values - a.sample_values);
    

    sortedValues.forEach(function (sample) {

        sampleValues.push(sample.sample_values);
        otuIDs.push(sample.otu_ids);
        otuLabels.push(sample.otu_labels);
        subjectIDs.push(sample.id);
    });
    console.log(sortedValues)

    //Populate dropdown menu with IDs
    var select = document.getElementById("selDataset");

    for(var i = 0; i < subjectIDs.length; i++) {
        
        var opt = subjectIDs[i];

        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        select.add(el);
    }

    
    // top10OTUs = sortedValues.slice(0, 10);

    //     var trace1 = {
    //     x: top10OTUs.map(object => object.sample_values),
    //     y: top10OTUs.map(object => object.otu_ids),
    //     text: top10OTUs.map(object => object.otu_labels),
    //     name: "OTUs",
    //     type: "bar",
    //     orientation: "h"
    //   };

    //   var data = [trace1];

    //   Plotly.newPlot("bar", data);

});

function optionChanged(id) {
    var dropdownMenu = d3.select("#selDataset");

    var selectedID = dropdownMenu.property("value");

    dropdownMenu.on("optionChanged", console.log(selectedID));
};

optionChanged();
