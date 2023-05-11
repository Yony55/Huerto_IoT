$(document).ready(() => {
        
    $.ajax({
        url: '',
        method: 'GET',
        success: (result) => {
            console.log(result)
            $("#hum1").html(result[result.length - 1].soilMoistureB)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
});

$(document).ready(() => {
        
    $.ajax({
        url: '',
        method: 'GET',
        success: (result) => {
            console.log(result)
            $("#huma1").html(result[result.length - 1].envHumidity)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
});

$(document).ready(() => {
        
    $.ajax({
        url: '',
        method: 'GET',
        success: (result) => {
            console.log(result)
            $("#intensidad1").html(result[result.length - 1].light)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
});

$(document).ready(() => {
        
    $.ajax({
        url: '',
        method: 'GET',
        success: (result) => {
            console.log(result)
            $("#temperatura1").html(result[result.length - 1].envTemperature)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
});