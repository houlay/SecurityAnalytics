// adapt the d3 time scale to add discontinuities, so that weekends are removed
const xScale = fc
  .scaleDiscontinuous(d3.scaleTime())
  .discontinuityProvider(fc.discontinuitySkipWeekends());

const priceScale = d3.scaleLinear();
const volumeScale = d3.scaleLinear();

// a candlestick series, by default it expects the provided data to have open, low, high, close, date properties
const candlestickSeries = fc
  .autoBandwidth(fc.seriesSvgOhlc())
  .xScale(xScale)
  .yScale(priceScale);

const volumeSeries = fc
  .autoBandwidth(fc.seriesSvgBar())
  .mainValue(d => d.volume)
  .crossValue(d => d.date)
  .xScale(xScale)
  .yScale(volumeScale);

const xAxis = d3.axisBottom().scale(xScale);
const priceAxis = d3.axisLeft().scale(priceScale);
const volumeAxis = d3
  .axisRight()
  .scale(volumeScale)
  .ticks(3)
  .tickFormat(d3.format(",.3s"));

// use the extent component to determine the x and y domain
const xExtent = fc.extentDate().accessors([d => d.date]);

const yExtent = fc
  .extentLinear()
  .accessors([d => d.high, d => d.low])
  .pad([0.1, 0.1]);

const volumeExtent = fc
  .extentLinear()
  .accessors([d => d.volume])
  .include([0]);

const parseDate = d3.timeParse("%d-%b-%y");

// handle the plot area measure event in order to determine the axis range
d3.select("#plot-area").on("measure", () => {
  const { width, height } = event.detail;
  xScale.range([0, width]);
  priceScale.range([height, 0]);
  volumeScale.range([height, (height * 2) / 3]);
});

// handle the x-axis draw event, rendering the axis
d3.select("#x-axis").on("draw", (d, i, nodes) => {
  d3.select(nodes[i])
    .select("svg")
    .call(xAxis);
});

// handle the y-axis measure event in order to offset the SVG to the left, and the
// draw event for rendering
d3.select("#y-axis")
  .on("measure", (d, i, nodes) => {
    const { width, height } = event.detail;
    d3.select(nodes[i])
      .select("svg")
      .attr("viewBox", `${-width} 0 ${width} ${height}`);
  })
  .on("draw", (d, i, nodes) => {
    const sel = d3
      .select(nodes[i])
      .select("svg")
      .selectAll("g")
      .data([0])
      .enter();
    sel.append("g").call(priceAxis);
    sel.append("g").call(volumeAxis);
  });
//data input for d3
const myData = [
  {
    close: ["4. close"],
    date: parseDate(today),
    high: ["2. high"],
    low: ["3. low"],
    open: ["1. high"],
    volume: ["5. volume"]
  }
];

function updateData() {
  console.log(myData);
  d3.select("#plot-area").on("draw", (d, i, nodes) => {
    const sel = d3
      .select(nodes[i])
      .select("svg")
      .selectAll("g")
      .data([myData])
      .enter();
    sel
      .append("g")
      .classed("volume", true)
      .call(volumeSeries);
    sel.append("g").call(candlestickSeries);
  });

  xScale.domain(xExtent(myData));
  priceScale.domain(yExtent(myData));
  volumeScale.domain(volumeExtent(myData));

  d3.select("#chart")
    .node()
    .requestRedraw();
}
updateData();

// });
