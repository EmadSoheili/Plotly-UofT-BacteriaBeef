function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data)
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
};

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var desiredSample = sampleArray.filter(i => i.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = desiredSample[0];
  
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample['otu_ids'].slice(0,10);
    var otuLabels = firstSample['otu_labels'].slice(0,10);
    var sampleValues = firstSample['sample_values'].slice(0,10);

    var otuIdsAll = firstSample['otu_ids'];
    var otuLabelsAll = firstSample['otu_labels'];
    var sampleValuesAll = firstSample['sample_values'];

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.map(i => 'OTU ' + i);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.reverse(),
      text: otuLabels.reverse(),
      type: 'bar',
      orientation: 'h'
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      hovermode:'closest',
      title: 'Top 10 Bacteria Cultures Found',
      yaxis: {
        tickvals: [0,1,2,3,4,5,6,7,8,9],
        ticktext: yticks.reverse()
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {color: 'white'}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);

    // Deliverable 2
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIdsAll,
      y: sampleValuesAll,
      text: otuLabelsAll,
      mode: 'markers',
      marker: {
        size: sampleValuesAll,
        color: sampleValuesAll,
        colorscale: 'Portland'
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cluster Per Sample',
      hovermode: 'closest',
      xaxis: {title: 'OTU ID'},
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {color: 'white'}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 

    // Deliverable 3
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metaArray = metadata.filter(i => i.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMeta = metaArray[0];

    // 3. Create a variable that holds the washing frequency.
    var wfreq = firstMeta['wfreq']

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: wfreq,
      type: 'indicator',
      mode: 'gauge+number',
      title: {text: 'Scrubs per Week'},
      gauge: {
        axis: {
          range: [null, 10],
          tickvals: [0,2,4,6,8,10],
          tickwidth: 1,
          tickcolor: "black"
        },
        bar: { color: "black"},
        steps: [
          {range: [0, 2], color: "red"},
          {range: [2, 4], color: "orange"},
          {range: [4, 6], color: "yellow"},
          {range: [6, 8], color: "lightgreen"},
          {range: [8, 10], color: "green"}
      ]
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     title: 'Belly Button Washing Frequency',
     paper_bgcolor: 'rgba(0,0,0,0)',
     plot_bgcolor: 'rgba(0,0,0,0)',
     font: {color: 'white'}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  });
};



