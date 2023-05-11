function actual() {
    fecha = new Date(); //Actualizar fecha.
    hora = fecha.getHours(); //hora actual
    minuto = fecha.getMinutes(); //minuto actual
    segundo = fecha.getSeconds(); //segundo actual
    if (hora < 10) { //dos cifras para la hora
        hora = "0" + hora;
    }
    if (minuto < 10) { //dos cifras para el minuto
        minuto = "0" + minuto;
    }
    if (segundo < 10) { //dos cifras para el segundo
        segundo = "0" + segundo;
    }
    //ver en el recuadro del reloj:
    mireloj = hora + " : " + minuto + " : " + segundo;
    return mireloj;
}

function actualizar() { //función del temporizador
    mihora = actual(); //recoger hora actual
    mireloj = document.getElementById("reloj"); //buscar elemento reloj
    mireloj.innerHTML = mihora; //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador

//grafica dona

var humedad = [];
var l1,l2

$(document).ready(() => {
    $.ajax({
        url:'/equipo1/soilmoist/2',
        method: 'GET',
        success: (result) => {
            console.log(result)
            if (result[result.length-1].soilMoistureB == 1) {
                var humedad = [1,0]
                l1 = 'Humedo'
                l2 = ''
            } else {
                var humedad = [0,1]
                l1 = ''
                l2 = 'Seco'
            }
            var ctx = document.getElementById("myChart")
            var myChart1 = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
                        data: humedad,
                        backgroundColor: [
                            'rgba(255, 230, 0, 0.2)',
                            'rgba(0, 0, 0, 0.15)'
                        ],
                        borderColor: [
                            'rgba(255, 230, 0, 1)',
                            'rgba(255, 230, 0, 1)'
                
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            ticks: { display: false },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }],
                        yAxes: [{
                            ticks: { display: false },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }]
                    }
                }
            });
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    })
});


var humedada = [];
$(document).ready(() => {
    $.ajax({
        url: '/equipo1/dht11/2',
        method: 'GET',
        success: (result) => {
            console.log(result)
            humedada.push(result[result.length - 1].envHumidity)
            humedada.push(100 - result[result.length - 1].envHumidity)
            var ctx = document.getElementById("myChart2")
            var myChart2 = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
                        data: humedada,
                        backgroundColor: [
                            'rgba(255, 230, 0, 0.2)',
                            'rgba(0, 0, 0, 0.15)'
                        ],
                        borderColor: [
                            'rgba(255, 230, 0, 1)',
                            'rgba(255, 230, 0, 1)'

                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }]
                    }
                }
            });
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    })
});


var luz = [];
$(document).ready(() => {
    $.ajax({
        url: '/equipo1/photo/2',
        method: 'GET',
        success: (result) => {
            console.log(result)
            luz.push(result[result.length - 1].light)
            luz.push(100 - result[result.length - 1].light)
            var ctx = document.getElementById("myChart3")
            var myChart3 = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
                        data: luz,
                        backgroundColor: [
                            'rgba(255, 230, 0, 0.2)',
                            'rgba(0, 0, 0, 0.15)'
                        ],
                        borderColor: [
                            'rgba(255, 230, 0, 1)',
                            'rgba(255, 230, 0, 1)'

                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }]
                    }
                }
            });
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    })
});


var temp = [];
$(document).ready(() => {
    $.ajax({
        url: '/equipo1/dht11/2',
        method: 'GET',
        success: (result) => {
            console.log(result)
            temp.push(result[result.length - 1].envTemperature)
            temp.push(100 - result[result.length - 1].envTemperature)
            var ctx = document.getElementById("myChart4")
            var myChart3 = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: '# of Votes',
                        data: temp,
                        backgroundColor: [
                            'rgba(255, 230, 0, 0.2)',
                            'rgba(0, 0, 0, 0.15)'
                        ],
                        borderColor: [
                            'rgba(255, 230, 0, 1)',
                            'rgba(255, 230, 0, 1)'

                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }]
                    }
                }
            });
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    })
});
