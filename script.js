//https://holidayapi.com/v1/holidays?pretty&key=083d15ce-e814-42a8-974b-fbf038fc4c31&country=IN&year=2023
//https://restcountries.com/v3.1/all

//country[0].altSpellings[0] - alt Code

$(".holidayList").hide();

$.ajax({
    url: "https://restcountries.com/v3.1/all",
    type: "GET",
    dataType: "json",
    success: function(country){
        getCountry(country);
    },
    error: function(){
        console.log("ERROR");
    }
})


function getCountry(country){
    for(let i = 0; i < country.length; i++){
        $("#countryList").append(
            "<option value = '" + country[i].altSpellings[0] + "'>" + country[i].name.common + "</option>"
        )
    }
}

$(".getValues button").click(function(){

    var altName = $("#countryList option:selected").val();
    var currentYear = new Date().getFullYear() - 1;


    $.ajax({
        url: "https://holidayapi.com/v1/holidays?pretty&key=083d15ce-e814-42a8-974b-fbf038fc4c31&country=" + altName + "&year=" + currentYear,
        type: "GET",
        dataType: "json",
        success: function(holiday){
            console.log(holiday.holidays[0]);
            getHolidays(holiday);
        },
        error: function(){
            console.log("ERROR");
        }
    })

    $("#publicHolidayList").html("");
    $("#notPublicHolidayList").html("");
    $(".holidayList").show();
    function getHolidays(holiday){
        for(let i = 0; i < holiday.holidays.length; i++){
            if(holiday.holidays[i].public){
                $("#publicHolidayList").append(
                    "<li>" + holiday.holidays[i].date +  " : " + holiday.holidays[i].name + "</li>"
                );
            }else{
                $("#notPublicHolidayList").append(
                    "<li>" + holiday.holidays[i].date +  " : " + holiday.holidays[i].name + "</li>"
                );
            }
            
        }
    }

});