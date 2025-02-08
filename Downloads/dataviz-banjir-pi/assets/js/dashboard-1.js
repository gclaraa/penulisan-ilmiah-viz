let data = [];
let monthlyIncidentChart = null;



// function filterData() {
//   const storeFilter = document.getElementById('storeFilter').value;
//   const monthFilter = document.getElementById('monthFilter').value;

//   const filteredData = data.filter(item =>
//       (storeFilter === '' || item.store_location === storeFilter) &&
//       (monthFilter === '' || item.Month === monthFilter)
//   );

//   updateMetrics(filteredData);
// }


// Load the data from the JSON file
fetch('assets/data/banjir2023-monthlyincident.json')
  .then(response => response.json())
  .then(data => {
    // // Extract the unique months and regions from the JSON data
    const months = [...new Set(data.map(item => item.bulan))];
        // Create an array to store the total incident numbers for each month
    const monthlyIncidents = months.map(month => {
      const matchingData = data.filter(item => item.bulan.toLowerCase() === month.toLowerCase());
      return matchingData.reduce((acc, cur) => acc + parseInt(cur.jumlah_kejadian), 0);
    });

    // Create the chart configuration
    const config = {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Jumlah Kejadian',
          data: monthlyIncidents,
          borderColor: 'navy',      
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Total Incident Numbers by Month'
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
            }
          },
          x: {
            title: {
              display: true,
          
            },
            ticks: {
              autoSkip: false, 
              maxRotation: 0, 
              minRotation: 0, 
              padding: 20,
            }
          }
        },
        legend: {
          display: true,
          shape: 'line',
        }
        
      }
    };

    // Create the chart
    const ctx = document.getElementById('monthlychart').getContext('2d');
    new Chart(ctx, config);
  });

//Jumlah Korban
fetch('assets/data/banjir2023-victimstotal.json')
  .then(response => response.json())
  .then(data => {
    // // Extract the unique months and regions from the JSON data
    const aggregatedData = {};

    data.forEach(item => {
        const wilayah = item.wilayah;
        const jumlah = parseInt(item.jumlah_jiwa_terdampak, 10) || 0; // Convert to integer

        if (!aggregatedData[wilayah]) {
            aggregatedData[wilayah] = 0;
        }
        aggregatedData[wilayah] += jumlah;
    });

    // Prepare the labels and data for the chart
    const labels = Object.keys(aggregatedData);
    const values = Object.values(aggregatedData);

    // Create the bar chart
    const ctx = document.getElementById('victimstotal').getContext('2d');
    const victimstotal = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Jiwa Terdampak',
                data: values,
                fill : 'navy',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    
                   
                    ticks: {
                      autoSkip: false, 
                      maxRotation: 0, 
                      minRotation: 0, 
                      padding: 20,
                    }
                },
                y: {
                    
                    beginAtZero: true
                }
            }
        }
    });
})
.catch(error => console.error('Error fetching the JSON data:', error));
    


//Populasi Terdampak
// Load the JSON data
// fetch('banjir2023-////.json')
//   .then(response => response.json())
//   .then(data => {
//     // Update the chart data
//     chart.data.labels = data.labels; // Assuming your JSON has a 'labels' property
//     chart.data.datasets[0].data = data.data; // Assuming your JSON has a 'data' property
//     chart.update();
//   })
//   .catch(error => {
//     console.error('Error loading JSON data:', error);
//   });
// // Get the canvas element
// const canvas = document.getElementById('affectedchart');

// // Create a new Chart instance
// const chart = new Chart(canvas, {
//   type: 'pie',
//   data: {
//     labels: [], // Replace with your labels from the JSON file
//     datasets: [{
//       label: 'My First Dataset',
//       data: [], // Replace with your data from the JSON file
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   },
//   options: {
//     // Customize your chart options here
//   }
// });

// const ctx = document.getElementById('affectedchart').getContext('2d');
// const affectedchart = new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow'],
//         datasets: [{
//             label: 'My First Dataset',
//             data: [12, 19, 3],
//             backgroundColor: [
//                 'rgb(255, 99, 132)',
//                 'rgb(54, 162, 235)',
//                 'rgb(255, 206, 86)',
//             ],
//             hoverOffset: 4
//         }]
//     }
// });


//Rata rata ketinggian