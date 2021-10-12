
// model var
let model = new EBM();

// utility function to convert decimal dates to a js Date object
// https://stackoverflow.com/questions/22058630/javascript-function-to-convert-decimal-years-value-into-years-months-and-days
function formatDecimalDate(decimalDate) {
    decimalDate = parseFloat(decimalDate);

    var totalDays = decimalDate * 365;
    var years = Math.floor(totalDays/365);
    var months = Math.floor((totalDays-(years *365))/30);
    var days = Math.floor(totalDays - (years*365) - (months * 30));
    var result = `${years}/${('0'+months).slice(-2)}/${('0'+days).slice(-2)}`;

    return result;
}

function celciusToKelvinNorm(celciusTemp) {
    // anomaly (c) + 20th century average + kelvin constant
    return parseFloat(celciusTemp) + 15.77778 + 273.15;
}


// chart globals
let chartElement = document.querySelector('#chart');
let chart;

// https://www.chartjs.org/docs/latest/samples/utils.html
const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

// datasets
// let co2_dataset = [];
// let real_temperature = [];
// let model_predictions = [];

async function fetchJSON(filepath) {
    let result = await fetch(filepath);
    return await result.json();
}

// bc i'm not good at async
let dataObject;

// begin fetch quest
// using async/await functionality for readability
async function getData() {

    // CO2 dataset from NASA
    // https://climate.nasa.gov/vital-signs/carbon-dioxide/
    let co2_json = await fetchJSON("./co2.json");
    let co2_dataset = []
    // let model_predictions = [];
    co2_json.forEach(datum => {
        // CO2 data
        co2_dataset.push({
            // x: decimalDateToDatetime(datum["Decimal Date"]),
            x: formatDecimalDate(datum["Decimal Date"]),
            y: parseFloat(datum["Monthly Average"]),
        });
        /*
        // model prediction
        model_predictions.push({
            x: (datum["Decimal Date"]),
            y: 1
        });
        */
    })

    let real_temperature = [];

    let temperature_anomoly = await fetchJSON('./temperature_anomoly.json');
    temperature_anomoly.forEach(datum => {
        real_temperature.push(
            {
                x: `${datum["Year"]}/01/01`,
                y: celciusToKelvinNorm(datum["No Smoothing"])
            }
        );
    })

    // chart.js format our datasets
    dataObject = {
        // labels: "CO2 Emissions",
        datasets: [
            {
                label: "CO2 Monthly Average (ppm)",
                data: co2_dataset,
                // https://www.chartjs.org/docs/latest/samples/line/line.html
                borderColor: CHART_COLORS.green,
                backgroundColor: 'rgb(75, 192, 192, 50)'
            },
            {
                label: "Annual Average Anomaly (K)",
                data: real_temperature,
                borderColor: CHART_COLORS.blue,
                backgroundColor: 'rgb(54, 162, 235, 50)'
            }

            // { //test data
            //     data: [{x:1, y:5},{x:2, y:55},{x:3, y:65}],
            //     borderColor: 'rgb(255, 99, 132)',
            //     backgroundColor: 'rgb(255, 99, 132, 50)'
            // }
        ]

    }
    return dataObject;
}

// get data first
getData()
    // create chart
    .then(() => {
        console.log(dataObject['datasets'])
        // chart data
        chart = new Chart(chartElement, {
            type: 'line',
            // async means this has been defined already... i think
            // it works, ok
            data: dataObject,
            options: {
                responsive: true,
                scales: {
                    stacked: true,
                    x: {
                        type: 'time',
                        // distribution: 'series',
                        time: {
                            format: 'YYYY/MM/DD',
                        }
                    },
                    // x: {
                    //     suggestedMin: 1958,
                    //     suggestedMax: 2022
                    // },
                    y: {
                        suggestedMax: 100
                    }
                }
            }
        });
    });


