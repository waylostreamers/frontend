var filteredData
var filteredManufacturers
var filteredAttributes
var attributeSelected
var departmentSelected
var manufacturerSelected
var originalData
var uniqueManufacturers
var uniqueAttributes
var uniqueDepartments
var uniqueSizeA
var uniqueSizeB
var uniqueSizeC
var checkedRows = []
var purchasedPrices = []
var purchasedItems =[]
var puchasedItemNames =[]
var purchasedItemDescriptions = []
var purchasedItemSizes = []
var checkoutData = []
var numItemsPurchased

/*** function to split a tyre size into smaller component sizes  
 * Size: "235/65R18" becomes and array ['235','65','18']
 * 
 * */
function splitSize(sizeString){

var str = sizeString;
var res = str.split("/");
if(res[1]){
    var res2 = res[1].split("R")}
else {
    res2 = sizeString
}
if (res[0]) { 
sizeA = res[0]
}
else{
sizeA = "NA"}
//console.log(sizeA)
if (res2[0]){
sizeB = res2[0]
}
else {
    sizeB = "NA"
}
//console.log(sizeB)
if(res2[1]){
sizeC = res2[1]}
else {
    sizeC = "NA"
}
//console.log(sizeC)

result = [sizeA, sizeB, sizeC]
return result

}


/***
 * Attribute: "SL"
Department Name: "AUTO TIRES"
Item Description: "SUPERMAX TM-1"
Item Name: "R20B-15"
Item Number: "1017"
Manufacturer: "SUPERMAX"
Regular Price: "60.768"
Size: "235/65R18"
 * 
 * 
 */

//console.log(splitSize("205/55ZR16"))

function render(renderData){

    



    renderData.sort(function(a, b){
        if(a['Item Description'] < b['Item Description']) { return -1; }
        if(a['Item Description'] > b['Item Description']) { return 1; }
        return 0;
    })




    console.log(renderData)

    numItemsPurchased = 0

    checkedRows = []

    var tbody = d3.select("tbody");

    tbody.selectAll("tr").remove()

    //console.log(renderData)

    renderData.forEach((tyre) => {

        var row = tbody.append("tr");
        row.append('input').attr('type','checkbox')
        Object.entries(tyre).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);

        });
        
        checkedRows.push(0)
        
        
        
    });
    
         uniqueManufacturers = d3.map(renderData, function(d){return d['Manufacturer'];}).keys()
         uniqueManufacturers.sort()
         uniqueAttributes = d3.map(renderData, function(d){return d['Attribute'];}).keys()
         uniqueAttributes.sort()
         uniqueDepartments = d3.map(renderData, function(d){return d['Department Name'];}).keys()
         uniqueDepartments.sort()
         uniqueSizeA = d3.map(renderData, function(d){return d['sizeA'];}).keys()
         uniqueSizeA.sort(function(a, b){return a-b})
        // console.log(uniqueSizeA)
         uniqueSizeB = d3.map(renderData, function(d){return d['sizeB'];}).keys()
         uniqueSizeB.sort(function(a, b){return a-b})
        // console.log(uniqueSizeB)
         uniqueSizeC = d3.map(renderData, function(d){return d['sizeC'];}).keys()
         uniqueSizeC.sort(function(a, b){return a-b})
        // console.log(uniqueSizeC)

    
        d3.select("#selectManufacturer")
         .html("")
         .append('option')
         .text("select")
        d3.select("#selectManufacturer")
        .selectAll('myOptions')
        .data(uniqueManufacturers)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
    
        d3.select("#selectAttribute")
        .html("")
        .append('option')
        .text("select")
        d3.select("#selectAttribute")
        .selectAll('myOptions')
        .data(uniqueAttributes)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

        d3.select("#selectDepartment")
        .html("")
        .append('option')
        .text("select")
        d3.select("#selectDepartment")
        .selectAll('myOptions')
        .data(uniqueDepartments)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

       d3.select("#selectSizeA")
        .html("")
        .append('option')
        .text("select")
       d3.select("#selectSizeA")
       .selectAll('myOptions')
       .data(uniqueSizeA)
       .enter()
       .append('option')
       .text(function (d) { return d; }) // text showed in the menu
       .attr("value", function (d) { return d; }) // corresponding value returned by the button
   
       d3.select("#selectSizeB")
       .html("")
       .append('option')
       .text("select")
       d3.select("#selectSizeB")
       .selectAll('myOptions')
       .data(uniqueSizeB)
       .enter()
       .append('option')
       .text(function (d) { return d; }) // text showed in the menu
       .attr("value", function (d) { return d; }) // corresponding value returned by the button

       d3.select("#selectSizeC")
       .html("")
       .append('option')
       .text("select")
       d3.select("#selectSizeC")
       .selectAll('myOptions')
       .data(uniqueSizeC)
       .enter()
       .append('option')
       .text(function (d) { return d; }) // text showed in the menu
       .attr("value", function (d) { return d; }) // corresponding value returned by the button



}

function cleanData(element) {
    return element['Item Name'].charAt(0) == "R" || element['Item Name'].charAt(0) ==  "S" ;
  }

d3.csv("floydjune.csv").then(function(data) {

     //console.log(data[0]['Item Number'])

    var data = data.filter(cleanData);

    data.forEach((element) => {
       // console.log(element)
       // console.log(element.Size)
         let splitSizeArray = splitSize(element.Size)
         
         element.sizeA = splitSizeArray[0]
         element.sizeB = splitSizeArray[1]
         element.sizeC = splitSizeArray[2]

    });

   // console.log(data)

    //append splitstring values to each data element
    // obj.key3 = "value3";

    originalData = data
    var tbody = d3.select("tbody");
// YOUR CODE HERE!
    filteredData = data
    render(filteredData)

    // When the button is changed, run the updateChart function
    d3.select("#selectManufacturer").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
    console.log(selectedOption)
        updateManufacturer(selectedOption)
    })

    d3.select("#selectAttribute").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
   // console.log(selectedOption)
    updateAttribute(selectedOption)
    })

    d3.select("#selectDepartment").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
      //  console.log(selectedOption)
        updateDepartment(selectedOption)
        })

    d3.select("#selectSizeA").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
      //  console.log(selectedOption)
        updateSizeA(selectedOption)
        })
    d3.select("#selectSizeB").on("change", function (d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
         //   console.log(selectedOption)
            updateSizeB(selectedOption)
            })
     d3.select("#selectSizeC").on("change", function (d) {
                // recover the option that has been chosen
                var selectedOption = d3.select(this).property("value")
                // run the updateChart function with this selected option
            //    console.log(selectedOption)
                updateSizeC(selectedOption)
                })    

    var button = d3.select("#reset");

button.on("click", function() {
    purchasedPrices = []
    purchasedItems = []
    numItemsPurchased = 0
    purchasedItemDescriptions = []
    purchasedItemSizes = []
    filteredData = originalData
    render(originalData)


    var elements = document.getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].selectedIndex = 0;
    }
   // console.log("Hi, a button was clicked!");
   // console.log(d3.event.target);
    tbody.selectAll("tr").remove()

    originalData.forEach((element) => {
        var row = tbody.append("tr");
        row.append('input').attr('type','checkbox')
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
        row.append('input').attr('type','checkbox')
    });
    
});



var button2 = d3.select("#checkcart");

button2.on("click", function() {

//console.log("checkout")
var tbody = d3.select("tbody");
var rows = tbody.selectAll("tr");

rows.each(function(p) {
    var cbval = d3.select(this)
                    .selectAll("input")
                        .property("checked")
    if(cbval) {
        var price = d3.select(this)
                        .selectAll("td")
        let valArray = []
        price.each(function(p) {

            t = d3.select(this).text()
            valArray.push(t)
        });
        purchasedItems.push(valArray[0])
        purchasedPrices.push(valArray[5])
        purchasedItemDescriptions.push(valArray[1])
        purchasedItemSizes.push(valArray[4])
        
           
    }                   
  });

  const add = (a, b) => parseFloat(a) + parseFloat(b)
  var cartTotal = purchasedPrices.reduce(add)
  alert("You ordered these items: " + purchasedItems + " cart total is $" + cartTotal)
  purchasedItems = []
  purchasedPrices = []
  purchasedItemSizes = []
  purchasedItemDescriptions = []
  cartTotal = []
  numItemsPurchased = 0
 

});

var button3 = d3.select("#checkout");

button3.on("click", function() {

//console.log("checkout")
var tbody = d3.select("tbody");
var rows = tbody.selectAll("tr");

rows.each(function(p) {
    var cbval = d3.select(this)
                    .selectAll("input")
                        .property("checked")
    if(cbval) {
        var price = d3.select(this)
                        .selectAll("td")
        let valArray = []
        price.each(function(p) {

            t = d3.select(this).text()
            valArray.push(t)
        });
        purchasedItems.push(valArray[0])
        purchasedPrices.push(valArray[5])
        purchasedItemDescriptions.push(valArray[1])
        purchasedItemSizes.push(valArray[4])
        numItemsPurchased = numItemsPurchased + 1
        
    
           
    }                   
  });

  const add = (a, b) => parseFloat(a) + parseFloat(b)
  var cartTotal = purchasedPrices.reduce(add)
  //alert("You ordered these items: " + purchasedItems + " cart total is $" + cartTotal)
  checkoutData.push([purchasedPrices],[purchasedItems],[purchasedItemDescriptions],[purchasedItemSizes])
  //alert(checkoutData)
  //console.log(checkoutData)
  localStorage.setItem( 'checkoutObject', checkoutData );
  localStorage.setItem( 'checkoutCart', cartTotal );
  localStorage.setItem( 'numPurchases', numItemsPurchased );
  var url = './checkout.html';
  window.location = url;

 

});

});


function updateSizeA(selected) {

    var tbody = d3.select("tbody");
    var dataFilter = filteredData.filter(ob => ob['sizeA'] === selected)
    tbody.selectAll("tr").remove()

    filteredData.forEach((element) => {
        var row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    });
    
    filteredData = dataFilter
    render(filteredData)

}

function updateSizeB(selected) {
    
    console.log(selected)
    var tbody = d3.select("tbody");
    console.log(filteredData)
    var dataFilter = filteredData.filter(ob => ob['sizeB'] === selected)
    tbody.selectAll("tr").remove()

    console.log(dataFilter)

    dataFilter.forEach((element) => {
        var row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    });
    
    //console.log(dataFilter)
    render(dataFilter)

}

function updateSizeC(selected) {

    var tbody = d3.select("tbody");
    var dataFilter = filteredData.filter(ob => ob['sizeC'] === selected)
    tbody.selectAll("tr").remove()

    filteredData.forEach((element) => {
        var row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    });
    
    filteredData = dataFilter
    render(filteredData)

}



function updateManufacturer(selected) {

    var tbody = d3.select("tbody");
    var dataFilter = filteredData.filter(ob => ob['Manufacturer'] === selected)
    tbody.selectAll("tr").remove()

    filteredData.forEach((element) => {
        var row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    });
    
    filteredData = dataFilter
    render(filteredData)

}

function updateDepartment(selected) {

    var tbody = d3.select("tbody");
    var dataFilter = filteredData.filter(ob => ob['Department Name'] === selected)
    tbody.selectAll("tr").remove()

    filteredData.forEach((element) => {
        var row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    });
    
    filteredData = dataFilter
    render(filteredData)

}


function updateAttribute(selected) {
    var tbody = d3.select("tbody");

    

    // Create new data with the selection?
    // var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })
  //  console.log(selected)
    var dataFilter = filteredData.filter(ob => ob['Attribute'] === selected)
    tbody.selectAll("tr").remove()
    //tbody.selectAll("table").remove()

    dataFilter.forEach((element) => {
        var row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    });
   // dataFilter.forEach(element => console.log(element));
    filteredData = dataFilter
    render(filteredData)

}





