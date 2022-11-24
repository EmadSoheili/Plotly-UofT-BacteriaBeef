
// Sort Data
var sortedCities = cityGrowths.sort((a,b) => b.Increase_from_2016 - a.Increase_from_2016);

// Select top 5 cities
var topFiveCities = sortedCities.slice(0,5);

// Create array for cities and population growth
var topFiveCityNames = topFiveCities.map(i => i.City);
var topFiveCityGrowths = topFiveCities.map(i => parseInt(i.Increase_from_2016));

// Plot Bar chart
var plotData = [{
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: 'bar'
}];

var layout = {
    title: 'Most Rapidly Growing Cities',
    xaxis: {title: 'City'},
    yaxis: {title: 'Population Growth, 2016-2017'}
};

Plotly.newPlot('bar-plot', plotData, layout);