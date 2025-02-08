// Modal syntax
document.addEventListener('DOMContentLoaded', (event) => {
    // Get all modals
    var modals = document.querySelectorAll('[id^="myModal"]');

    // Get all elements that open the modals
    var imgs = document.querySelectorAll('[id^="myChart"]');

    // Get all <span> elements that close the modals
    var spans = document.querySelectorAll('.close');

    // Loop through each image and add click event listener
    imgs.forEach((img, index) => {
        img.onclick = function() {
            modals[index].style.display = 'block';
        }
    });

    // Loop through each span and add click event listener
    spans.forEach((span, index) => {
        span.onclick = function() {
            modals[index].style.display = 'none';
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        modals.forEach((modal) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});


// Monthly Incident

async function initData(dataset) {
    //request payment method
    const response = await fetch('./data/monthly_incident.json')
    // convert fetch response to object
    const responseJSON = await response.json()
    const datasetData = responseJSON.dataset.find(item => Object.keys(item)[0] === dataset);
    console.log(responseJSON)
    return datasetData[dataset].map(row => ({
        tipe: row.Type,
        rata: Number(row.rata_type)
    }));
}


let chartInstance2;
let chartModalInstance2;

// script to generate pie chart payment methods
async function monthlyincidentChart(responseData) {
    const ctx = document.getElementById('piechart');
    const ctxModal = document.getElementById('piechartModal');

    // convert response to data
    const chartData = []
    let totalData = 0

    // generate total data
    responseData.map(n => {
        totalData = totalData + Number(n.rata)
    })

    // generate data percentage
    responseData.map(n => {
        chartData.push(Number(n.rata) * 100 / totalData)
    })

    const data = {
        labels: [
            'Cash',
            'Credit',
        ],
        datasets: [{
            data: chartData,
            backgroundColor: [
                'rgb(135,206,235)',
                'rgb(65,105,225)',
            ],
            hoverOffset: 4
        }]
    };
    if (chartInstance2) {
        chartInstance2.destroy();
    }
    chartInstance2 = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    fullSize: true,
                    labels: {
                        color:'#8899A6',
                        boxWidth: window.innerWidth > 768 ? 25 : 20,
                        boxHeight: window.innerWidth > 768 ? 7 : 5,
                        width: "100%",
                        font: {
                            size: window.innerWidth > 768 ? 10 : 7,
                            weight: 'bold',
                        }
                    },
                    position: 'bottom',
                },
            }
        }
    });

    if (chartModalInstance2) {
        chartModalInstance2.destroy();
    }
    chartModalInstance2 = new Chart(ctxModal, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    fullSize: true,
                    labels: {
                        boxWidth: window.innerWidth > 768 ? 25 : 20,
                        boxHeight: window.innerWidth > 768 ? 7 : 5,
                        width: "100%",
                        font: {
                            size: window.innerWidth > 768 ? 10 : 7,
                            weight: 'bold',
                        }
                    },
                    position: 'bottom',
                },
            }
        }
    });

}


// Top Category Per Month
// Function to fetch data from JSON file

async function fetchDataFromJson(dataset) {
    const response = await fetch('./data/chart1.json');
    const data = await response.json();
    const datasetData = data.dataset.find(item => Object.keys(item)[0] === dataset);
    console.log(data)
    return datasetData[dataset].map(row => ({
        month: row.Bulan,
        category: row.Category,
        Total_Penjualan: Number(row.Total_Penjualan)
    }));
}

let chartInstance;
let chartModalInstance;

// function to render chart

async function renderChart(data) {
    const ctx = document.getElementById('chartbar').getContext('2d');
    const ctxModal = document.getElementById('chartbarModal').getContext('2d');
    const uniqueMonths = [...new Set(data.map(item => item.month))]; // Extract value bulan unik

    const foodData = data.filter(item => item.category === 'Food').map(item => item.Total_Penjualan);
    const waterData = data.filter(item => item.category === 'Water').map(item => item.Total_Penjualan);
    const carbonatedData = data.filter(item => item.category === 'Carbonated').map(item => item.Total_Penjualan);
    const nonCarbonatedData = data.filter(item => item.category === 'Non Carbonated').map(item => item.Total_Penjualan);

    const datasets = [
        {
            label: 'Food',
            data: foodData,
            backgroundColor: '#000080',
            borderColor: '#000080',
            borderWidth: 1
        },
        {
            label: 'Water',
            data: waterData,
            backgroundColor: '#1E90FF',
            borderColor: '#1E90FF',
            borderWidth: 1
        },
        {
            label: 'Carbonated',
            data: carbonatedData,
            backgroundColor: '#00BFFF',
            borderColor: '#00BFFF',
            borderWidth: 1
        },
        {
            label: 'Non Carbonated',
            data: nonCarbonatedData,
            backgroundColor: '#ADD8E6',
            borderColor: '#ADD8E6',
            borderWidth: 1
        }
    ];

    // Destroy existing chart instance if exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create new chart instance
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: uniqueMonths,
            datasets: datasets
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: {
                    ticks: {
                        color:'#8899A6', 
                        font: {
                            weight: 'bold',
                            size: window.innerWidth > 576 ? 8 : 5
                        }
                    },
                    stacked: true,
                },
                y: {
                    ticks: {
                        color:'#8899A6',
                        font: {
                            weight: 'bold',
                            size: window.innerWidth > 576 ? 8 : 5
                        }
                    },
                    stacked: true
                }
            },
            plugins: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        mode: 'x',
                    },
                },
                legend: {
                    fullSize: true,
                    labels: {
                        color:'#8899A6',
                        boxWidth: window.innerWidth > 576 ? 8 : 5,
                        boxHeight: window.innerWidth > 576 ? 8 : 5,
                        width: "100%",
                        
                        font: {
                            size: window.innerWidth > 576 ? 8 : 5,
                            weight: 'bold'
                        }
                    }
                }
            },
        }
    });

    if (chartModalInstance) {
        chartModalInstance.destroy();
    }
    chartModalInstance = new Chart(ctxModal, {
        type: 'bar',
        data: {
            labels: uniqueMonths,
            datasets: datasets
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: {
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: window.innerWidth > 768 ? 10 : 7
                        }
                    },
                    stacked: true,
                },
                y: {
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: window.innerWidth > 768 ? 10 : 7
                        }
                    },
                    stacked: true
                }
            },
            plugins: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        mode: 'x',
                    },
                },
                legend: {
                    responsive: true,
                    fullSize: true,
                    labels: {
                        boxWidth: window.innerWidth > 576 ? 8 : 5,
                        boxHeight: window.innerWidth > 576 ? 8 : 5,
                        width: "100%",
                        font: {
                            size: window.innerWidth > 768 ? 10 : 7,
                            weight: 'bold'
                        }
                    }
                }
            },
        }
    });
}



// Top 10 Most Sold Product
// Function to fetch  data from json

async function fetchData1(dataset) {
        const response = await fetch('./data/chart2.json');
        const data = await response.json();
        console.log(data)
        const datasetdt = data.dataset.find(ds => Object.keys(ds)[0] === dataset);
        return datasetdt[dataset].map(row => ({
            product: row.Product,
            total: Number(row.jumlah_terjual)
        }));
}

let chartInstance1;
let chartModalInstance1;

// function to render chart

async function renderChart1(data) {

        const labels = data.map(item => item.product);
        const values = data.map(item => item.total);

        // Create the chart
        const ctx = document.getElementById('chartproduct').getContext('2d');
        const ctxModal = document.getElementById('chartProductModal').getContext('2d');

        const datasets = [{
            label: 'RQTY',
            data: values,
            backgroundColor: '#0f357b',
            borderColor: '#0f357b',
            borderWidth: 1,
            borderRadius: 5
        }];

        if (chartInstance1) {
            chartInstance1.destroy();
        }

        chartInstance1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
            responsive: true,
            indexAxis: 'y',// This makes the chart horizontal
                scales: {
                    x: {
                        ticks: {
                            color:'#8899A6',
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 576 ? 8 : 5
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            color:'#8899A6',
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 576 ? 8 : 5
                            }
                        }
                    }
                },
                responsive: true,
                plugins: {
                    tooltips: {
                        displayColors: true,
                        callbacks: {
                            mode: 'x',
                        },
                    },
                    legend: {
                        fullSize: true,
                        labels: {
                            color:'#8899A6',
                            width: "100%",
                            boxWidth: window.innerWidth > 576 ? 8 : 5,
                            boxHeight: window.innerWidth > 576 ? 8 : 5,
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 576 ? 8 : 5
                            }
                        },

                    },
                }
            }
        });

        if (chartModalInstance1) {
            chartModalInstance1.destroy();
        }

        chartModalInstance1 = new Chart(ctxModal, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
            responsive: true,
            indexAxis: 'y',// This makes the chart horizontal
                scales: {
                    x: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        }
                    }
                },
                plugins: {
                    tooltips: {
                        displayColors: true,
                        callbacks: {
                            mode: 'x',
                        },
                    },
                    legend: {
                        fullSize: true,
                        labels: {
                            width: "100%",
                            boxWidth: window.innerWidth > 576 ? 8 : 5,
                            boxHeight: window.innerWidth > 576 ? 8 : 5,
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },

                    },
                }
            }
        });
}

// Function to resizze canvas

function resizeCanvas(canvasIds) {
    canvasIds.forEach(canvasId => {
        const canvas = document.getElementById(canvasId);
        var heightRatio = 1.0;
        canvas.height = canvas.width * heightRatio;
    });
}

// Main function to fetch data and render chart

async function main(dataset) {
    // Fetch data from JSON file
    const data1 = await fetchDataFromJson(dataset);

    // Initial Render chart with fetched data
    renderChart(data1);
    resizeCanvas(['chartbar', 'chartbarModal'])

     // Re-render on window resize
     window.addEventListener('resize', () => {
        resizeCanvas(['chartbar', 'chartbarModal']);
        renderChart(data1);
    });
    console.log(data1);
}

async function main2(dataset) {
    // Fetch data from JSON file
    const data2 = await fetchData1(dataset);

    // Render chart with fetched data
    await renderChart1(data2);
    resizeCanvas(['chartproduct', 'chartProductModal'])

     // Re-render on window resize
     window.addEventListener('resize', () => {
        resizeCanvas(['chartproduct', 'chartProductModal']);
        renderChart1(data2);
    });
    console.log(data2);
}

async function main3(dataset) {
    // Fetch data from JSON file
    const data3 = await initData(dataset);

    // Render chart with fetched data
    await generatePaymentMethodsChart(data3);
    console.log(data3);
}


// Initialize with default dataset

main('default');
main2('default');
main3('default');


// Event listener for dropdown change

const filTer = document.getElementById('filter');
filTer.addEventListener('change', async (e) => {
    const dataset = e.target.value;
    await main(dataset);
    await main2(dataset);
    await main3(dataset);
});

// Function to fetch from json and use tablechart

function grabData() {
    fetch('data/totalPenjualanLibrary.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tabelchart = $("#tabelchart");

            // Add table head
            tabelchart.html(`
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Month</th>
                        <th>Avg_price</th>
                        <th>quantity sold</th>
                    </tr>
                </thead>
            `);

            tabelchart.DataTable({
                scrollY: window.innerWidth > 576 ? '180px' : '100px',
                scrollX: true,
                scrollCollapse: true,
                responsive: true,
                autoWidth: false,
                "data": data,
                "columns": [
                    { "data": "Product" },
                    { "data": "Bulan" },
                    { "data": "Avg_price" },
                    { "data": "Total_penjualan"}
                ],
                
                "columnDefs": [
                    {width: "100%", targets: [0]},
                    {width: "50px", targets: [1,2,3] },
                    {className: "text_center", targets: [1,2,3] }
                ]
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// function to render table
grabData();