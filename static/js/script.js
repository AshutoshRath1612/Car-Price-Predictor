function senddata() {
    document.getElementById('predictbutton').addEventListener("click", (event)=>{
        event.preventDefault();
    });
    const params = new FormData();
    params.append("company",document.getElementById('company').value)
    params.append("model",document.getElementById('modell').value)
    params.append("fuel_type",document.getElementById('fuel_type').value)
    params.append("year",document.getElementById('year').value)
    params.append("kms_driven",document.getElementById('kms_driven').value)
    console.log(params)

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/predict', true);

    document.getElementById('resulttxt').innerHTML = 'Wait! Price Predicting...'

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE){
            document.getElementById('resulttxt').innerHTML = 'The Predicted Price is ₹' + xhr.responseText
        }
    }
    xhr.onload = function(){}
    xhr.send(params);
}

function load_car_model(brandid , modelid , modellist){
    modellist = modellist.split("'")
    index = 0
    models = []
    for(i = 1; i < modellist.length; i+=2){
        models[index++] = modellist[i]
    }
    var company = document.getElementById(brandid);
    var model = document.getElementById(modelid);

    model.innerHTML = ""
    model.value = ""

    for(j = 0; j < models.length; j++){
        if (models[j].toLowerCase().includes(company.value.toLowerCase())){
            console.log(models[j])
            var newOption = document.createElement("option");
            newOption.value = models[j]
            newOption.innerHTML = models[j]
            model.appendChild(newOption)
        }
    }
}