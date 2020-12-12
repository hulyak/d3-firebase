// data for d3 in array format
const data = [
  {width: 200, height: 100, fill: 'purple'},
  {width: 100, height: 60, fill: 'pink'},
  {width: 50, height: 30, fill: 'red'},
];

const svg = d3.select('svg');

// Join data to rects
const rects = svg
  .selectAll ('rect') //select all the rects
  .data (data); //each rect has data

// add attrs to rects already in the DOM
rects
  .attr ('width', (d, i, n) => d.width)
  // console.log (n[i]); //rect workaround for this
  .attr ('height', d => d.height)
  .attr ('fill', d => d.fill);

// APPEND THE ENTER SELECTION TO DOM
// If we don't have data array items inside the html, add them to virtual dom
rects
  .enter ()
  .append ('rect')
  .attr ('width', (d, i, n) => d.width)
  .attr ('height', d => d.height)
  .attr ('fill', d => d.fill);

// this keyword in arrow function is not bound - window
// normal function refers to the item
// d - data  i - index place in array, n - rect