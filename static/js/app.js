// Build the metadata panel
function buildMetadata(id) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let sampleData = data;
    let metadata = sampleData.metadata;

    // Filter the metadata for the object with the desired sample number
    let identifier = metadata.filter(sample =>
      sample.id.toString() === id)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(identifier).forEach(([key, value]) => {
      panel.append('h6').text(`${key}: ${value}`);
    });
  })
};

// function to build both charts
function buildCharts(id) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleData = data;
    let samples = sampleData.samples;

    // Filter the samples for the object with the desired sample number
    let identifier = samples.filter(sample => sample.id === id);
    let filtered = identifier[0];

    // Get the otu_ids, otu_labels, and sample_values
    let OTUvalues = filtered.sample_values.slice(0, 10).reverse();
    let OTUids = filtered.otu_ids.slice(0, 10).reverse();
    let labels = filtered.otu_labels.slice(0, 10).reverse();
    
    // Build a Bubble Chart
    let bubbleTrace = {
      x: filtered.otu_ids,
      y: filtered.sample_values,
      mode: 'markers',
      marker: {
          size: filtered.sample_values,
          color: filtered.otu_ids,
          colorscale: 'Portland'
      },
      text: filtered.otu_labels,
    };
    let bubbleData = [bubbleTrace];
    let bubbleLayout = {
        title: `OTUs for Subject ${id}`,
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
    };
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let barTrace = {
      x: OTUvalues,
      y: OTUids.map(object => 'OTU ' + object),
      name: labels,
      type: 'bar',
      orientation: 'h'
  };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barLayout = {
      title: `Top 10 OTUs for Subject ${id}`,
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID' }
  };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
