const svg = d3.select("svg");

d3.json("menu.json").then((data) => {

  // const min = d3.min(data, (d) => d.orders);
  // const max = d3.max(data, (d) => d.orders);
  const extent = d3.extent(data, (d) => d.orders); // extent find both min and max
  console.log(extent);

  // linear scales - height
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)]) // min, max
    .range([0, 500]);

  // band scales - width get the name of the dishes
  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 500]) // dimensions of the graph
    .paddingInner(0.2) // give space between bars
    .paddingOuter(0.2);

  // console.log(x("veg curry"));
  console.log(x.bandwidth()); // width of the each bar

  // join the data to rects
  const rects = svg.selectAll("rect").data(data);

  rects
    .attr("width", x.bandwidth) // don't invoke
    .attr("height", (d) => y(d.orders)) // comes from json data, pass through scale
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name)); // 70 px apart

  // append the enter selection to the DOM
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name));
});
