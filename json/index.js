// select svg container
const svg = d3.select("svg");

//returns a promise with .then
d3.json("planets.json").then((data) => {
    const circs = svg.selectAll("circle").data(data);

    // add attrs to circles already in DOM - we have nothing in DOM
    circs
        .attr("cy", 100)
        .attr("cx", (d) => d.distance)
        .attr("r", (d) => d.radius)
        .attr("fill", (d) => d.fill);

    // append the enter selection to the DOM
    circs
        .enter()
        .append("circle")
        .attr("cy", 100)
        .attr("cx", (d) => d.distance)
        .attr("r", (d) => d.radius)
        .attr("fill", (d) => d.fill);
});
