import {
    barChart
} from './script.js';

const data = await d3.csv('./data/co2_emissions_kt_by_country.csv', d3.autoType);


const chart = barChart(data, {
    x: d => d.value,
    y: d => d.country_name
});

const year_dup = d3.map(data, d => d.year);
const year = year_dup.filter(function(elem, pos) {
    return year_dup.indexOf(elem) == pos
});

const continent_dup = d3.map(data, d => d.continent);
const continent = continent_dup.filter(function(elem, pos) {
    return continent_dup.indexOf(elem) == pos
});

const yearbutton = d3.select('#year-filter')
    .selectAll('yearOptions')
        .data(year)
    .enter()
        .append('option')
    .text(function (d) {return d})
    .attr("value", function(d) {return d});

const continentbutton = d3.select('#continent-filter')
    .selectAll('continentOptions')
    .data(continent)
    .enter()
    .append('option')
    .text(function (d) {return d})
    .attr("value", function(d) {return d});

console.log(year);

d3.select('body').append(() => chart);