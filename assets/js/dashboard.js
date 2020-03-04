  $toID = 0;

  var ctx = document.getElementById('myChart').getContext('2d');
  var graph2 = document.getElementById('myChart2').getContext('2d');
  var pie = document.getElementById('myChart3').getContext('2d');
  var pie2 = document.getElementById('pieChart2').getContext('2d');
  var bar1 = document.getElementById('barChart1').getContext('2d');
  var bar2 = document.getElementById('barChart2').getContext('2d');
  var doughnut1 = document.getElementById('doughnut1').getContext('2d');
  var doughnut2 = document.getElementById('doughnut2').getContext('2d');


    var barChart1 = new Chart(bar1, {
      type: 'bar',
      data: {},
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            display: false,
            font: {
              weight: 'bold'
            },
            formatter: Math.round
          }
        },
        title: {
                display: true,
                text: 'Grievance per Province'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 10
                }
            }],
            xAxes: [{
              ticks: {
                fontSize: 10
              }
            }]
        },
        // legend: {
        //     display: true,
        //     fullWidth: true,
        //     align: 'left'
        // },
        responsive: true,
        maintainAspectRatio: false
    }
  });

  var barChart2 = new Chart(bar2, {
      type: 'horizontalBar',
      data: {},
      options: {
       plugins: {
          datalabels: {
            color: 'black',
            display: false,
            font: {
              weight: 'bold'
            },
            formatter: Math.round
          }
        },
        title: {
                display: true,
                text: 'Grievance per Category'
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontSize: 10
                }
            }],
            xAxes: [{
              ticks: {
                fontSize: 10,
                beginAtZero: true,
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
  });


  var barChart3 = new Chart(ctx, {
      type: 'bar',
      data: {},
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            display: false,
            font: {
              weight: 'bold'
            },
            formatter: Math.round
          }
        },
        title: {
                display: true,
                text: 'Grievance per Province'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 10
                }
            }],
            xAxes: [{
              ticks: {
                fontSize: 10
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
  });


  var barChart4 = new Chart(graph2, {
      type: 'horizontalBar',
      data: {},
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            display: false,
            font: {
              weight: 'bold'
            },
            formatter: Math.round
          }
        },
        title: {
                  display: true,
                  text: 'Grievance per Category'
          },
      legend: {
        display: true,
      },
      scales: {
          xAxes: [{
              ticks: {
                  beginAtZero: true,
                  fontSize: 10
              }
          }],
          yAxes: [{
            ticks: {
              fontSize: 10
            }
          }]
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  var doughnut = new Chart(doughnut1, {
      type: 'doughnut',

      data: {
        datasets: [{
          backgroundColor: [
            "#3F5EFB",
            "#FC466B",
          ],
          datalabels: {
            anchor: 'center'
          }
        }]
      },

      options: {
          plugins: {
            datalabels: {
              color: 'black',
              display: false,
              font: {
                weight: 'bold'
              },
              formatter: Math.round
            }
          },
            title: {
                display: true,
                text: 'Grievance Status'
            },
            responsive: true,
            maintainAspectRatio: false,
    }
  });

  var doughnut2 = new Chart(doughnut2, {
      type: 'doughnut',

      data: {
        datasets: [{
          backgroundColor: [
            "#3F5EFB",
            "#F9C449",
            "#FC466B",

          ],
          datalabels: {
            anchor: 'center'
          }
        }]
      },

      options: {
          plugins: {
              datalabels: {
                color: 'black',
                display: false,
                font: {
                  weight: 'bold'
                },
                formatter: Math.round
              }
            },
            title: {
                display: true,
                text: 'Deadline Status'
            },
            responsive: true,
            maintainAspectRatio: false,
    }
  });



  var pieChart = new Chart(pie, {
      type: 'pie',
      data: {
        datasets: [{
          backgroundColor: [
            "#3F5EFB",
            "#6096FD",
            "#0671B7",
            "#67A3D9",
            '#F8B7CD',
            "#FAA7BB",
            "#FB7BBE",
            "#FC466B"
          ],
          datalabels: {
            anchor: 'center'
          }
        }]
      },

      options: {
            plugins: {
                datalabels: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'bold'
                  },
                  formatter: Math.round
                }
            },
            responsive: true,
            maintainAspectRatio: false,

    }
  });

    var pieChart2 = new Chart(pie2, {
      type: 'pie',
      data: {
        datasets: [{
          backgroundColor: [
            "#3F5EFB",
            "#6096FD",
            "#0671B7",
            "#67A3D9",
            '#F8B7CD',
            "#FAA7BB",
            "#FB7BBE",
            "#FC466B"

          ],
          datalabels: {
            anchor: 'center'
          }
        }]
      },

      options: {
          plugins: {
                  datalabels: {
                    color: 'black',
                    display: false,
                    font: {
                      weight: 'bold'
                    },
                    formatter: Math.round
                  }
          },
          title: {
                  display: true,
                  text: 'Report Modes'
              },
          responsive: true,
          maintainAspectRatio: false,
         
      }
  });


  function displayDatalabels(chart) {
      chart.options = {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js'
          },
          scales: {
              xAxes: [{
                  display: true
              }],
              yAxes: [{
                  display: true
              }]
          }
      };
      chart.update();
  }

  barGraph();
  barGraph2();
  pieGraph();
  dougnutGraph();
  dougnutGraphDeadline();

  function barGraph() {
    let province = [];
    let data1 = [];
    let data2 = []; 
    $.ajax({
      url: $base_url + 'dashboard/fetch_provinces',
      method: 'POST',
      data: {},
      success: function(result) {
          let pname = '';
          let data = JSON.parse(result);
          
          $.each(data, function(k, v) {
            province.push(v.g_province);
            data1.push(v.sumResolved);
            data2.push(v.sumOngoing);
          });
          addDataBar(barChart1, province, data1, data2);
          addDataBar(barChart3, province, data1, data2);

      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.error('Error in fetching provinces: ' + xhr.status + ' => ' + thrownError);
      }

    });
  }

  function barGraph2() {
    let catName = [];
    let catFname = [];
    let data1 = [];
    let data2 = []; 
    $.ajax({
      url: $base_url + 'dashboard/fetch_categories',
      method: 'POST',
      success: function(result) {
          let data = JSON.parse(result);
          $.each(data, function(k, v) {
            var str = v.category_name;
            var matches = str.match(/\b(\w)/g);
            var acronym = matches.join('');
            catName.push(acronym.toUpperCase());
            catFname.push(v.category_name);
            data1.push(v.sumResolved);
            data2.push(v.sumOngoing);
          });

          addDataBar(barChart2, catName, data1, data2);
          addDataBar(barChart4, catFname, data1, data2);

      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.error('Error in fetching categries: ' + xhr.status + ' => ' + thrownError);
      }

    });
  }

  function pieGraph() {
    $.ajax({
      url: $base_url + 'dashboard/fetch_modes',
      method: 'POST',
      data: {},
      success: function(result) {
          let data = JSON.parse(result);
          $.each(data, function(k, v) {
            addData(pieChart, v.g_mode, v.countModes);
            addData(pieChart2, v.g_mode, v.countModes);
          });
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.error('Error in fetching report modes: ' + xhr.status + ' => ' + thrownError);
      }
    });
  }


  function dougnutGraph() {
    $.ajax({
          url: $base_url + 'dashboard/fetch_status',
          method: 'POST',
          data: {},
          success: function(result) {
              let data = JSON.parse(result);
              $.each(data, function(k, v) {
                addData(doughnut, v.g_status, v.countStatus);
              });
          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.error('Error in fetching status: ' + xhr.status + ' => ' + thrownError);
          }
        });
  }

  function dougnutGraphDeadline() {
    var normal = $('#nd-norm').val();
    var priority = $('#nd-prio').val();
    var pdeadline = $('#nd-pdead').val();
    addData(doughnut2, 'Normal', normal);
    addData(doughnut2, 'Priority', priority);
    addData(doughnut2, 'Past Deadline', pdeadline);
  }


    function addDataBar(chart, dataName, data1, data2) {
      for(let i=0; i < dataName.length; i++) {
          chart.data.labels.push(dataName[i]);
      }

      chart.data.datasets.push({
        label: 'Resolved',
        backgroundColor: '#3F5EFB',
        borderColor: '#3F5EFB',
        data: data1
      });
      
      chart.data.datasets.push({
        label: 'Ongoing',
        backgroundColor: '#FC466B',
        borderColor: '#FC466B',
        data: data2
      });
      chart.update();
    }

    function addData(chart1, label1, data1) {
      chart1.data.labels.push(label1);
      chart1.data.datasets.forEach((dataset) => {
          dataset.data.push(data1);
      });
      chart1.update();
    }


  table_call('#tbl-dash-bar');
  table_call('#tbl-dash-bar-h');
  table_call('#tbl-dash-pie');

  function table_call(tableID) {
    $(tableID).DataTable( {
      responsive: true,
      searching: false,
      bFilter: false,
      bPaginate: false,
      bInfo: false,
      autoWidth: true,
      "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            for (var i = 1 ; i <= 3; i++) {
              // Total over all pages
              total = api
                  .column( i )
                  .data()
                  .reduce( function (a, b) {
                      return intVal(a) + intVal(b);
                  }, 0 );
   
              // Total over this page
              pageTotal = api
                  .column( i, { page: 'current'} )
                  .data()
                  .reduce( function (a, b) {
                      return intVal(a) + intVal(b);
                  }, 0 );
   
              // Update footer
              $( api.column( i ).footer() ).html(total);
            }
        }
    });

  }
  
    $('.btn-dash').click(function() {
      if (this.id == 'btn-dash1') {
        $('#btn-dash2').removeClass('active');
        $('#btn-dash1').addClass('active');
        $('#dash-1').show();
        $('#dash-2').hide();
      } else if (this.id == 'btn-dash2') {
        $('#btn-dash1').removeClass('active');
        $('#btn-dash2').addClass('active');
        $('#dash-2').show();
        $('#dash-1').hide();
      }
    });




  $('.btn-print').off().on('click', () => {
    $('.print-div').removeClass('mt-4');
    $('.print-div').css({'margin-top' : '200px'});
    $('.print-div1').css({'margin-top' : '200px'});
    $('.btn-print').hide();
    displayBarchart(true);
    let trig = $("#content").attr('class');
    $('.content-footer').hide();
    setTimeout(() => {
      if (trig == 'active') {
        window.print();
      } else {
        $('#sidebarCollapse').click();
        window.print();
      }
    }, 1000);
    

  });

  window.onafterprint = function(){
    $('.print-div').addClass('mt-4');
    $('.print-div1').css({'margin-top':''});
    $('.btn-print').show();
    $('.content-footer').show();
    displayBarchart(false);
  }


  function displayBarchart(args) {
    barChart1.options.plugins.datalabels.display = args;
    barChart2.options.plugins.datalabels.display = args;
    barChart3.options.plugins.datalabels.display = args;
    barChart4.options.plugins.datalabels.display = args;
    doughnut.options.plugins.datalabels.display = args;
    doughnut2.options.plugins.datalabels.display = args;
    pieChart.options.plugins.datalabels.display = args;
    pieChart2.options.plugins.datalabels.display = args;
    setTimeout(() => {
      barChart1.update();
      barChart2.update();
      barChart3.update();
      barChart4.update();
      doughnut.update();
      doughnut2.update();
      pieChart.update();
      pieChart2.update();
    }, 100);

  }


// grantee_count();

// function grantee_count() {
//   $.ajax({
//     url: $base_url + 'Dashboard/fetch_grantee_count',
//     dataType: 'json',
//     success: result => {
//       $('.grantee-count').html(result.countAll);
//     },
//     error: (xhr, ajaxOptions, thrownError) => {
//       console.error('Error in fetching total count of Grantee: ' + xhr.status + ' => ' + thrownError);
//     }
//   });
// }