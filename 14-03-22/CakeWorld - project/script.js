// Cake layers
const cake = {
    nextLayer:1,
    layer1:"",
    layer2:"",
    layer3:"",
    layer4:"",
    layer5:""
}
const cakeLayers = {};
cakeLayers.chocolate = {price:300,color:"#D2691E",count:0};
cakeLayers.strawberry = {price:100,color:"rgb(201, 55, 55)",count:0};
cakeLayers.butterscotch = {price:200,color:"rgb(238,232,170)",count:0};
cakeLayers.redvelvet = {price:350,color:"red",count:0};
cakeLayers.vannila = {price:250,color:"#f6f6f6",count:0};


// Event Listener
document.getElementById("chocolate").addEventListener("click",handleAddLayer);
document.getElementById("strawberry").addEventListener("click",handleAddLayer);
document.getElementById("butterscotch").addEventListener("click",handleAddLayer);
document.getElementById("redvelvet").addEventListener("click",handleAddLayer);
document.getElementById("vannila").addEventListener("click",handleAddLayer);
document.getElementById("buy").addEventListener("click",handleBuy);

// Event Handlers
function handleAddLayer(e){
    if(cake.nextLayer > 5)return;
    const cakeType = String(e.target.id);
    cake[`layer${cake.nextLayer++}`] = cakeType;
    
    // Setting layer to the color
    const currentLayer = document.getElementById(`layer${cake.nextLayer - 1}`);
    currentLayer.style.backgroundColor = cakeLayers[cakeType].color;
    currentLayer.style.visibility = "visible";
    cakeLayers[cakeType].count++;

    // Adding price to the bill
    updateBill();

    // Checking/Putting candle
    if(cake.nextLayer > 5){
        document.getElementById("candles").style.visibility = "visible";
    }

    console.log(cake);
    return;
}

function handleBuy(e){
    let total = 0;
    for(let i in cakeLayers){
        if(cakeLayers[i].count > 0){
            total += cakeLayers[i].count * cakeLayers[i].price;
        }
    }
    document.getElementById("total").textContent = total;
}

function updateBill(){
    for(let i in cakeLayers){
        if(cakeLayers[i].count > 0){
            document.getElementById(`${i}-total`).parentNode.style.visibility = "visible";
            document.getElementById(`${i}-total`).textContent = cakeLayers[i].count * cakeLayers[i].price;
        }else{
            document.getElementById(`${i}-total`).parentNode.style.visibility = "hidden";
        }
    }
}



