// append d3 to canvas
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// group
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  graph.append('rect');
graph.append('rect');
graph.append('rect');
const xAxisGroup = graph
  .append("g") // group
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

// d3.json("menu.json").then((data) => {

// get the data  from dishes collection
db.collection("dishes")
  .get()
  .then((res) => {
    // console.log(res);

    var data = [];
    // get the documents from Firestore
    res.docs.forEach((doc) => {
      data.push(doc.data()); // get the data with data method
    })
    console.log(data);

    // linear scales - height
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.orders)]) // min, max
      .range([graphHeight, 0]);

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
    const rects = graph.selectAll("rect").data(data);

    console.log(rects);

    rects
      .attr("width", x.bandwidth) // don't invoke
      .attr("height", (d) => graphHeight - y(d.orders)) // comes from json data, pass through scale
      .attr("fill", "orange")
      .attr("x", (d) => x(d.name)) // 70 px apart
      .attr("y", (d) => y(d.orders)); // by default y = 0

    // append the enter selection to the DOM
    rects
      .enter()
      .append("rect")
      .attr("width", x.bandwidth)
      .attr("height", (d) => graphHeight - y(d.orders))
      .attr("fill", "orange")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.orders));

    // create and call the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat((d) => d + " orders");

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // x ticks
    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .attr("text-anchor", "end") // rotate from the end
      .attr("fill", "orange");
  });
