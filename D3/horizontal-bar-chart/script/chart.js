export const barChart = (data, {
    svgId = 'bar-chart',
    x = d => d,
    y = (d, i) => i,
    marginTop = 30, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 10, // the bottom margin, in pixels
    marginLeft = 50, // the left margin, in pixels
    width = 640,
    yPadding = 0.1
}= {}) => {
    const X = d3.map(data, x);
    const Xint = X.map(function(d) {return +d;});
    const Y = d3.map(data, y);

    const xDomain = [0, d3.max(Xint)+2];
    const yDomain = new d3.InternSet(Y);

    const height =  400 - marginTop - marginBottom; //Math.ceil((yDomain.size + yPadding)*25) + marginTop + marginBottom;
    const yRange = [marginTop, height - marginBottom];
    const xRange = [marginLeft, width - marginRight]
    const xScale = d3.scaleLinear(xDomain, xRange);
    const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
    const xAxisLoc = height - 20
    const I = d3.range(Xint.length).filter(i => yDomain.has(Y[i]));

    const svg = d3.create('svg')
        .attr('id', svgId)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

    svg.append('g')
        .attr('transform', `translate(0,${xAxisLoc})`)
        .call(xAxis)
        .call(g => g.select('.domain'))
        .call(g => g.selectAll('.tick line').clone()
            .attr('y2', height - marginTop - marginBottom)
            .attr('stroke-opacity', 0.1))
        .call(g => g.append('text')
            .attr('x', width - marginRight)
            .attr('y', -22)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'end'));

    svg.append('g')
        .attr('fill', "#69b3a2")
        .selectAll('rect')
        .data(I)
        .join('rect')
        .attr('x', xScale(0))
        .attr('y', i => yScale(Y[i]))
        .attr('width', i => xScale(X[i]) - xScale(0))
        .attr('height', yScale.bandwidth() - 10);

    svg.append('g')
        .attr('transform', `translate(${marginLeft},-5)`)
        .call(yAxis);

    return svg.node();
}