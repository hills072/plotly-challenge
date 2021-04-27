
d3.json("samples.json").then((data) => {

    // var names = data.names;

    console.log(data)
    var samples = data.samples;
    console.log(samples)

    otuIDs = [];
    sampleValues = [];
    otuLabels = [];
    subjectIDs = [];

    samples.forEach(function (sample) {

        sampleValues.push(sample.sample_values);
        otuIDs.push(sample.otu_ids);
        otuLabels.push(sample.otu_labels);
        subjectIDs.push(sample.id);
    });
    console.log(subjectIDs)

    var select = document.getElementById("selDataset");

    for(var i = 0; i < subjectIDs.length; i++) {
        
        var opt = subjectIDs[i];

        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        select.add(el);
    }

    var selectedID = subjectIDs.filter(subject => subject === opt);

// console.log(otuIDs)
// console.log(sampleValues)
// console.log(otuLabels)
    // sliced = 
    // var trace1 = {
    //     x: sampleValues,
    //     y: otu,
    //     text: reversedData.map(object => object.greekName),
    //     name: "Greek",
    //     type: "bar",
    //     orientation: "h"
    //   };
});
