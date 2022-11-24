const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(i => 
    i.map(j => console.log(j.location.latitude))
    );

