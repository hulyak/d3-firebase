const canvas = d3.select ('.canvas');
// wraps the div in a selection object
//select == querySelector - gives the first only
//selectAll == querySelectorAll

//append an svg to the canvas
//with attr add fill color radius
//method chaining
const svg = canvas.append ('svg').attr ('height', 600).attr ('width', 600);

const group = svg
  .append ('g') //group all the shapes wrapped in the group
  .attr ('transform', 'translate(50 , 100)');

// append shapes to group container
group
  .append ('rect')
  .attr ('width', 200)
  .attr ('height', 100)
  .attr ('fill', 'blue')
  .attr ('x', 20)
  .attr ('y', 20);

group
  .append ('circle')
  .attr ('r', 50)
  .attr ('cx', 300)
  .attr ('cy', 70)
  .attr ('fill', 'pink');

group
  .append ('line')
  .attr ('x1', 370)
  .attr ('x2', 400)
  .attr ('y1', 20)
  .attr ('y2', 120)
  .attr ('stroke', 'red');

//text svg
group
  .append ('text')
  .attr ('x', 20)
  .attr ('y', 200)
  .attr ('fill', 'grey')
  .text ('Hello ninjas')
  .style ('font-family', 'arial'); //css