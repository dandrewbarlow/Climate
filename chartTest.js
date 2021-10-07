
// utility function to convert decimal dates to a js Date object
// https://stackoverflow.com/questions/22058630/javascript-function-to-convert-decimal-years-value-into-years-months-and-days
function decimalDateToDatetime(decimalDate) {
    decimalDate = parseFloat(decimalDate);

    var totalDays = decimalDate * 365;
    var years = Math.floor(totalDays/365);
    var months = Math.floor((totalDays-(years *365))/30);
    var days = Math.floor(totalDays - (years*365) - (months * 30));
    // var result = new Date(years, months, days);
    var result = `${years}-${months}-${days}`;

    return result;
}


let chartElement = document.querySelector('#chart');
let chart;
let dataset = [];

// CO2 dataset from NASA
// https://climate.nasa.gov/vital-signs/carbon-dioxide/
fetch("./co2.json")
    .then(res => res.json())
    .then((d) => {
        // populate data
        d.forEach(datum => {
            dataset.push({
                // x: decimalDateToDatetime(datum["Decimal Date"]),
                x: (datum["Decimal Date"]),
                y: parseFloat(datum["Monthly Average"])
            })
        });

        // chart data
        chart = new Chart(chartElement, {
            type: 'line',
            // async means this has been defined already... i think
            // it works, ok
            data: dataObject,
            options: {
                responsive: true,
                scales: {
                    x: {
                        suggestedMin: 1958,
                        suggestedMax: 2022
                    },
                    y: {
                        suggestedMax: 100
                    }
                }
            }
        });
    })
    .catch(e => console.error(e));


let dataObject = {
    // labels: "CO2 Emissions",
    datasets: [
        {
            label: "CO2 Monthly Average (ppm)",
            data: dataset,
            // https://www.chartjs.org/docs/latest/samples/line/line.html
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132, 50)'
        }
        // { //test data
        //     data: [{x:1, y:5},{x:2, y:55},{x:3, y:65}],
        //     borderColor: 'rgb(255, 99, 132)',
        //     backgroundColor: 'rgb(255, 99, 132, 50)'
        // }
    ]
}

console.log(dataset);

