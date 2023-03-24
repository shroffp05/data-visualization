import {
    barChart
} from './chart.js';

const data = await d3.csv('./data/fruits.csv');

const chart = barChart(data, {
    x: d => d.price,
    y: d => d.fruit
});

d3.select('body').append(() => chart);