/*eslint-env browser*/

//HELPER FUNCTION TO GET ELEMENTS BY ID
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

//OBJECT literal for prices and sizes
var handTossed = [{size: "Small", price: "9.99"}, {size: "Medium", price: "12.99"}, {size: "Large", price: "14.99"}];
var thinCrust = [{size: "Medium", price: "11.99"}, {size: "Large", price: "13.99"}];
var newYorkStyle = [{size: "Large", price: "16.99"}, {size: "Extra Large", price: "19.99"}];
var glutenFree = [{size: "Small", price: "10.99"}];

//Cheese and sauce options
var cheeseOptions = [{amount: "Light", price: "0.00"}, {amount: "Normal", price: "0.00"}, {amount: "Extra", price: "2.99"}, {amount: "Double", price: "3.99"}];

var sauceOptions = [{flavor: "Regular Tomato", price: "0.00"}, {flavor: "Hearty Tomato", price: "0.99"}, {flavor: "BBQ Sauce", price: "1.99"}];

//var addressStorage = [];

var toppingStorage = [];

//WINDOW ONLOAD

window.addEventListener("load", function () {
    "use strict";
    var addresstype, i, orderText,
        //variables to target elements in running total
        //crustOrder, sizeOrder, cheeseOrder, sauceOrder, toppingsOrder, priceOrder,  selCrustSize, 
        crustOrder = $("crust_order"), sizeOrder = $("size_order"), cheeseOrder = $("cheese_order"), sauceOrder = $("sauce_order"), toppingsOrder = $("topping_order"), priceOrder = $("price_order"), selCrustSize = $("crustsizes"), selCheese = $("cheeses"), selSauce = $("sauces"), theToppings = $("yourtoppings"),
        //variables to programatically create options in cheese and sauce dropdowns
        opCheese, opSauce,
        //variables for updatePrice
        sizePrice = 0, cheesePrice = 0, saucePrice = 0, toppingPrice = 0,
        //variables for event listener on changing of radio buttons
        ht = $("hand_tossed"), tc = $("thin_crust"), ny = $("ny_style"), gf = $("gluten_free");
    
    
    //FUNCTIONS TO VALIDATE NAME AND ADDRESS
    
            function checkName(name, namevalid) {
            var x = $(name).value,
                nameCheck = /^[a-zA-Z\s\.]+$/,
                nameResult = nameCheck.test(x);
            if (x.length === 0 || nameResult === false) {
                $(name).style.backgroundColor = "#ffe2e2";
                $(name).style.borderColor = "red";
                $(namevalid).innerHTML = "&nbsp;Must enter a name.";
                //window.alert("Must enter a valid name.");red
                $(name).focus();
            } else {
                $(name).style.backgroundColor = "#d4ffc4";
                $(name).style.borderColor = "green";
                $(namevalid).innerHTML = "";
                return true;
                } 
            }
        
        function checkOtherAddress() {
            var x;
            x = $("formother_address").value;
            if (addresstype.value === "other" && x === "") {
                //window.alert("Must enter an address type.");
                $("formother_address").style.backgroundColor = "#ffe2e2";
                $("formother_address").style.borderColor = "red";
                $("otheraddvalid").innerHTML = "&nbsp;Must enter an address type.";
                $("formother_address").focus();
            } else { 
                $("formother_address").style.backgroundColor = "#d4ffc4";
                $("formother_address").style.borderColor = "green";
                $("otheraddvalid").innerHTML = "";
                return true;
                }
            }
        
        function checkAddress(address, addvalid) {
            var x;
            x = $(address).value;
            if (x === "") {
                $(address).style.backgroundColor = "#ffe2e2";
                $(address).style.borderColor = "red";
                $(addvalid).innerHTML = "&nbsp;Must enter an address.";
                //window.alert("Must enter an address.");
                $(address).focus();
            } else {
                $(address).style.backgroundColor = "#d4ffc4";
                $(address).style.borderColor = "green";
                $(addvalid).innerHTML = "";
                return true;
            }    
        }
    
        function checkCity(city, cityvalid) {
            var x;
            x = $(city).value;
            if (x === "") {
                $(city).style.backgroundColor = "#ffe2e2";
                $(city).style.borderColor = "red";
                $(cityvalid).innerHTML = "&nbsp;Must enter a city.";
                //window.alert("Must enter a city.");
                $(city).focus();
            } else {
                $(city).style.backgroundColor = "#d4ffc4";
                $(city).style.borderColor = "green";
                $(cityvalid).innerHTML = "";
                return true;
                }
            }
            
        function checkState(state, statevalid) {
            var x;
            x = $(state).value;
            var stateCheck = /^\D{2}$/;
            var stateResult = stateCheck.test(x);
            if (x === "" || stateResult === false) {
                $(state).style.backgroundColor = "#ffe2e2";
                $(state).style.borderColor = "red";
                $(statevalid).innerHTML = "&nbsp;Must enter a 2-letter state code (ex. 'CA').";
                //window.alert("Must enter a two-letter state code.");
                $(state).focus();
            } else {
                $(state).style.backgroundColor = "#d4ffc4";
                $(state).style.borderColor = "green";
                $(statevalid).innerHTML = "";
                return true;
                }
            }
            
        function checkZIP(zip, zipvalid) {
            var x = $(zip).value;
            var zipCheck = /^[0-9]{5}(-\d{4})?$/; //use this one
            var zipResult = zipCheck.test(x);
            if (x === "" || zipResult === false) {
                $(zip).style.backgroundColor = "#ffe2e2";
                $(zip).style.borderColor = "red";
                $(zipvalid).innerHTML = "&nbsp;Must enter a 5-digit ZIP (ex. '92101').";
                //window.alert("Must enter a valid ZIP.");
                $(zip).focus();
                //FOCUS on invalid field
            } else {
                $(zip).style.backgroundColor = "#d4ffc4";
                $(zip).style.borderColor = "green";
                $(zipvalid).innerHTML = "";
                return true;
                }
            }    
        
        function checkPhone() {
            var x = $("formphone").value;
            var phoneCheck = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
            var phoneResult = phoneCheck.test(x);
            if (x === "" || phoneResult === false) {
                $("formphone").style.backgroundColor = "#ffe2e2";
                $("formphone").style.borderColor = "red";
                $("phonevalid").innerHTML = "&nbsp;Must enter a phone number (ex. 619-123-4567).";                
                //window.alert("Must enter a valid phone.");
                $("formphone").focus();
            } else {
                $("formphone").style.backgroundColor = "#d4ffc4";
                $("formphone").style.borderColor = "green";
                $("phonevalid").innerHTML = "";
                return true;
                }
            }
            
        function checkEmail() {
            var x = $("formemail").value;
            var emailCheck = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            var emailResult = emailCheck.test(x);
            if (x === "" || emailResult === false) {
                $("formemail").style.backgroundColor = "#ffe2e2";
                $("formemail").style.borderColor = "red";
                $("emailvalid").innerHTML = "&nbsp;Must enter a valid email (ex. 'pizza@pizza.com').";
                //window.alert("Must enter a valid email address.");
                $("formemail").focus();
            } else { 
                $("formemail").style.backgroundColor = "#d4ffc4";
                $("formemail").style.borderColor = "green";
                $("emailvalid").innerHTML = "";
                return true;
                }
            }
            
            /*
            
            {
        var y = document.getElementById("form1");
        var text = "";
        var i;
        //if everything is validated code here...
        
        for (i = 0; i < y.length; i += 1) {
            text += y.elements[i].value + "|";
            addressStorage.push(text);
                }
            }
        } //window.console.log(text);
    
    */
     function validateForm() {
        checkName("formname", "namevalid");
         checkOtherAddress();
         checkAddress("formaddress", "addvalid");
         checkCity("formcity", "cityvalid");
         checkState("formstate", "statevalid");
         checkZIP("formzip", "zipvalid");
         checkPhone();
         checkEmail();
         if(checkName("formname", "namevalid") && checkOtherAddress() && checkAddress("formaddress", "addvalid") && checkCity("formcity", "cityvalid") && checkState("formstate", "statevalid") && checkZIP("formzip", "zipvalid") && checkPhone() && checkEmail()) 
         /*if ($("namevalid").innerHTML === "" && $("addressvalid").innerHTML === "" && $("cityvalid").innerHTML === "" && $("statevalid").innerHTML === "" && $("zipvalid").innerHTML === "" && $("phonevalid").innerHTML === "" && $("emailvalid").innerHTML === "") */
            {
            $("form2").style.display = "block";
            $("demo").style.display = "block";
            $("unhide").style.display = "block";
            $("form1").style.display = "none"; 
            } else {
                window.alert("Please complete all required fields.");
            }
        }
         
        function validateForm2() {
        checkName("formname2", "namevalid2");
         checkAddress("formaddress2", "addvalid2");
         checkCity("formcity2", "cityvalid2");
         checkState("formstate2", "statevalid2");
         checkZIP("formzip2", "zipvalid2");
         if(checkName("formname2", "namevalid2") && checkAddress("formaddress2", "addvalid2") && checkCity("formcity2", "cityvalid2") && checkState("formstate2", "statevalid2") && checkZIP("formzip2", "zipvalid2")) 
         /*if ($("namevalid").innerHTML === "" && $("addressvalid").innerHTML === "" && $("cityvalid").innerHTML === "" && $("statevalid").innerHTML === "" && $("zipvalid").innerHTML === "" && $("phonevalid").innerHTML === "" && $("emailvalid").innerHTML === "") */
            {
                return true;
            } else {
                window.alert("Please complete all required fields.");
            }
        }
    
    //SUBMIT FORM ... button should be either "button" or "submit"... submit refreshes page
    //keypress, focus, need to copy over into all form events
    
    $("formname").addEventListener("blur", function () {
            checkName("formname", "namevalid");
    });
    
    $("formname").addEventListener("keypress", function () {
            checkName("formname", "namevalid");
    });

    $("formother_address").addEventListener("blur", function () {
            checkOtherAddress();
    });

    $("formother_address").addEventListener("keypress", function () {
            checkOtherAddress();
    });
    
    $("formaddress").addEventListener("keypress", function () {
            checkAddress("formaddress", "addvalid");
    });
    
    $("formaddress").addEventListener("blur", function () {
            checkAddress("formaddress", "addvalid");
    });
    
    $("formcity").addEventListener("keypress", function () {
            checkCity("formcity", "cityvalid");
    });
    
    $("formcity").addEventListener("blur", function () {
            checkCity("formcity", "cityvalid");
    });
    
    $("formstate").addEventListener("keypress", function () {
            checkState("formstate", "statevalid");
    });
    
    $("formstate").addEventListener("blur", function () {
            checkState("formstate", "statevalid");
    });        
            
    $("formzip").addEventListener("keypress", function () {
            checkZIP("formzip", "zipvalid");
    });
    
     $("formzip").addEventListener("blur", function () {
            checkZIP("formzip", "zipvalid");
    });
    
    $("formphone").addEventListener("keypress", function () {
            checkPhone();
    });
    
    $("formphone").addEventListener("blur", function () {
            checkPhone();
    });
    
    $("formemail").addEventListener("keypress", function () {
            checkEmail();
    });
    
    $("formemail").addEventListener("blur", function () {
            checkEmail();
    });
    
    $("formname2").addEventListener("blur", function () {
            checkName("formname2", "namevalid2");
    });
    
    $("formname2").addEventListener("keypress", function () {
            checkName("formname2", "namevalid2");
    });
    
    $("formaddress2").addEventListener("keypress", function () {
            checkAddress("formaddress2", "addvalid2");
    });
    
    $("formaddress2").addEventListener("blur", function () {
            checkAddress("formaddress2", "addvalid2");
    });
    
    $("formcity2").addEventListener("keypress", function () {
            checkCity("formcity2", "cityvalid2");
    });
    
    $("formcity2").addEventListener("blur", function () {
            checkCity("formcity2", "cityvalid2");
    });
    
    $("formstate2").addEventListener("keypress", function () {
            checkState("formstate2", "statevalid2");
    });
    
    $("formstate2").addEventListener("blur", function () {
            checkState("formstate2", "statevalid2");
    });        
            
    $("formzip2").addEventListener("keypress", function () {
            checkZIP("formzip2", "zipvalid2");
    });
    
     $("formzip2").addEventListener("blur", function () {
            checkZIP("formzip2", "zipvalid2");
    });
    
    $("cvc_number").addEventListener("blur", function () {
            checkCVC();
    });
    
    $("cvc_number").addEventListener("keypress", function () {
            checkCVC();
    });
    
    $("cc_number").addEventListener("blur", function () {
            checkCCLength();
            checkCCType();
    });
    
    $("cc_number").addEventListener("keypress", function () {
            checkCCLength();
            checkCCType();
    });


    //Programatically create Crust Size dropdown
    
    function createCrustDropdown(yourCrust) {
        var i, opCrust;
        for (i = 0; i < yourCrust.length; i += 1) {
            opCrust = window.document.createElement("option");
            opCrust.innerHTML = yourCrust[i].size + " : $" + yourCrust[i].price;
            opCrust.value = i;
            selCrustSize.add(opCrust, i);
        }
    }
    
    //Update running order total
    
    function updateOrder(choice, category) {
        if (category.childNodes[1]) {
            category.removeChild(category.childNodes[1]);
        }
        orderText = document.createTextNode(choice);
        category.appendChild(orderText); 
    }
    
    //Update running price total
    
    function updatePrice() {
        var x = parseFloat(sizePrice) + parseFloat(cheesePrice) + parseFloat(saucePrice) + parseFloat(toppingPrice);
        //window.console.log(x.toFixed(2));
        priceOrder.innerHTML = "$" + x.toFixed(2);
        
        //get number of checked checkboxes
        //window.console.log(document.querySelectorAll('input[type="checkbox"]:checked').length);
        
    }
    updatePrice();
    
    //DETECT radio button selections for dough types
    
    ht.addEventListener("change", function () {
        if (ht.checked) {
            selCrustSize.options.length = 0;
            createCrustDropdown(handTossed);
            var x = handTossed[selCrustSize.value].size;
            sizePrice = handTossed[selCrustSize.value].price;
            updateOrder("Hand-Tossed", crustOrder);
            updateOrder(x, sizeOrder);
            updatePrice();
            $("form2a").style.display = "block";
        }
    });
    tc.addEventListener("change", function () {
        if (tc.checked) {
            selCrustSize.options.length = 0;
            createCrustDropdown(thinCrust);
            var x = thinCrust[selCrustSize.value].size;
            sizePrice = thinCrust[selCrustSize.value].price;
            $("form2a").style.display = "block";
            updateOrder("Thin Crust", crustOrder);
            updateOrder(x, sizeOrder);
            updatePrice();
        }
    });
    ny.addEventListener("change", function () {
        if (ny.checked) {
            selCrustSize.options.length = 0;
            createCrustDropdown(newYorkStyle);
            var x = newYorkStyle[selCrustSize.value].size;
            sizePrice = newYorkStyle[selCrustSize.value].price;
            $("form2a").style.display = "block";
            updateOrder("New York Style", crustOrder);
            updateOrder(x, sizeOrder);
            updatePrice();
        }
    });
    gf.addEventListener("change", function () {
        if (gf.checked) {
            selCrustSize.options.length = 0;
            createCrustDropdown(glutenFree);
            var x = glutenFree[selCrustSize.value].size;
            sizePrice = glutenFree[selCrustSize.value].price;
            $("form2a").style.display = "block";
            updateOrder("Gluten Free", crustOrder);
            updateOrder(x, sizeOrder);
            updatePrice();
        }
    });
    
    //Programatically create cheese dropdown
    
    
    //set Default in order/price update each time menu is created
    function loadCheese() {
        var x = cheeseOptions[selCheese.value].amount;
        updateOrder(x, cheeseOrder);
        cheesePrice = cheeseOptions[selCheese.value].price;
        updatePrice();
    }
    
    function loadSauce() {
        var x = sauceOptions[selSauce.value].flavor;
        updateOrder(x, sauceOrder);
        saucePrice = sauceOptions[selSauce.value].price;
        updatePrice();
    }
    
    for (i = 0; i < cheeseOptions.length; i += 1) {
        opCheese = window.document.createElement("option");
        opCheese.innerHTML = cheeseOptions[i].amount + " : +$" + cheeseOptions[i].price;
        opCheese.value = i;
        //opCheese.id = i;
        selCheese.add(opCheese, i);
    }
    loadCheese();
    
    //Programattically create sauce dropdown
    for (i = 0; i < sauceOptions.length; i += 1) {
        opSauce = window.document.createElement("option");
        opSauce.innerHTML = sauceOptions[i].flavor + " : +$" + sauceOptions[i].price;
        opSauce.value = i;
        //opCheese.id = i;
        selSauce.add(opSauce, i);
    }
    loadSauce();
    
    
    selCheese.addEventListener("change", function () {
        //Testing for functionality
        //window.console.log(selCheese.value);
        //window.console.log(cheeseOptions[selCheese.value]);
        //window.console.log(cheeseOptions[selCheese.value].amount);
        var x = cheeseOptions[selCheese.value].amount;
        updateOrder(x, cheeseOrder);
        cheesePrice = cheeseOptions[selCheese.value].price;
        updatePrice();
    });
    
    selSauce.addEventListener("change", function () {
        var x = sauceOptions[selSauce.value].flavor;
        updateOrder(x, sauceOrder);
        saucePrice = sauceOptions[selSauce.value].price;
        updatePrice();
    });
    
    selCrustSize.addEventListener("click", function () {
        var x;
        if (ht.checked) {
            x = handTossed[selCrustSize.value].size;
            sizePrice = handTossed[selCrustSize.value].price;
        } else if (tc.checked) {
            x = thinCrust[selCrustSize.value].size;
            sizePrice = thinCrust[selCrustSize.value].price;
        } else if (ny.checked) {
            x = newYorkStyle[selCrustSize.value].size;
            sizePrice = newYorkStyle[selCrustSize.value].price;
        } else if (gf.checked) {
            x = glutenFree[selCrustSize.value].size;
            sizePrice = glutenFree[selCrustSize.value].price;
        }
        updateOrder(x, sizeOrder);
        updatePrice();
    });
    
    
    //TOPPINGS CHECKBOXES
    
    theToppings.addEventListener("change", function () {
        var i, text = "", x = theToppings.querySelectorAll('input[type="checkbox"]:checked'), y = x.length;
        //theToppings instead of document to exclude other checkboxes.
        toppingPrice = y * 0.99;
        updatePrice();
        for (i = 0; i < y; i += 1) {
            if (i < (y - 1)) { 
            text += x[i].value + ", ";
            toppingStorage = [];
            toppingStorage.innerHTML = "";
            toppingStorage.push(text);
            toppingsOrder.innerHTML = toppingStorage;
            } else if (i === (y - 1)) {
            text += x[i].value; //No comma on last topping
            toppingStorage = [];
            toppingStorage.innerHTML = "";
            toppingStorage.push(text);
            toppingsOrder.innerHTML = toppingStorage;    
            }
        }
        if (y === 0) {
            toppingsOrder.innerHTML = "";
        }
    });
     
    addresstype = $("addressdropdown");
    
    //MAKE ADDRESSTYPE FIELD APPEAR AND DISAPPEAR
    
    addresstype.addEventListener("change", function () {
        if (addresstype.value === "other") {
            $("formotheraddress").style.display = "block";
            $("formother_address").value = "";//enterAddType(); 
        } else {
            //if (addresstype.value !== "other" && $("addressType"))
            $("formotheraddress").style.display = "none";
            //removeAddType();
        }
    });
    
    
    $("getstarted").addEventListener("click", function () {
        $("jumbotron1").style.display = "none";
        $("form1").style.display = "block";
        $("formname").focus();
    });
    
    
    $("submit1").addEventListener("click", function () {
        
        validateForm();
        
    });
    
    $("unhide").addEventListener("click", function () {
        $("unhide").style.display = "none";
        $("form1").style.display = "block";
    });
    
    //ARE YOU FINISHED??? Get confirmation box - LOCK all forms above and unhide part 3
    
    $("submit2").addEventListener("click", function () {
       var x = confirm("Click OK to proceed to payment information. If you would like to make more changes, click Cancel.");
        if (x === true) {
            $("form1").style.display = "none";
            $("form2").style.display = "none";
            $("form2a").style.display = "none";
            $("unhide").style.display = "none";
            $("form3").style.display = "block";
            //hide, unhide, send
        } 
    });
    
    $("copy_address").addEventListener("change", function () {
        if ($("copy_address").checked) {
            $("formname2").value = $("formname").value;
            $("formaddress2").value = $("formaddress").value;
            $("formapt2").value = $("formapt").value;
            $("formcity2").value = $("formcity").value;
            $("formstate2").value = $("formstate").value;
            $("formzip2").value = $("formzip").value;
            //Set required fields to green since already validated in previous step
            $("formname2").style.backgroundColor = "#d4ffc4";
            $("formname2").style.borderColor = "green";
            $("formaddress2").style.backgroundColor = "#d4ffc4";
            $("formaddress2").style.borderColor = "green";
            $("formcity2").style.backgroundColor = "#d4ffc4";
            $("formcity2").style.borderColor = "green";
            $("formstate2").style.backgroundColor = "#d4ffc4";
            $("formstate2").style.borderColor = "green";
            $("formzip2").style.backgroundColor = "#d4ffc4";
            $("formzip2").style.borderColor = "green";
        } 
    });
    
    function checkDates() {
        var d = new Date(); //get current date
        window.console.log(d);    //testing that correct date is found
        var dexm = parseInt(d.getMonth());
        var dexv = parseInt($("expiration_month").value);
        var dexyv = parseInt($("expiration_year").value);
        var dexyy = d.getFullYear();
            if (dexyv === dexyy && dexm > dexv) {
                window.alert("Sorry, your card is expired.");
            } else {
                return true;
            } //validateCreditCard();
        }
        
    
        function checkCVC() {
            var cvc = $("cvc_number").value;
            var cvcCheck = /^[0-9]{3}?$/; //use this one
            var cvcResult = cvcCheck.test(cvc);
            if (cvc === "" || cvcResult === false) {
                $("cvc_number").style.backgroundColor = "#ffe2e2";
                $("cvc_number").style.borderColor = "red";
                $("cvcvalid").innerHTML = "&nbsp;Must enter a valid 3-digit CVC.";
                //window.alert("Must enter a valid email address.");
                $("cvc_number").focus();
            } else { 
                $("cvc_number").style.backgroundColor = "#d4ffc4";
                $("cvc_number").style.borderColor = "green";
                $("cvcvalid").innerHTML = "";
                return true;
                //window.alert("Must enter a valid CVC.");
                //$("cvc_number").focus();
                //FOCUS on invalid field
                } 
            }
    
            
        function checkCCLength () {
            var cc = $("cc_number").value; //numerical value
            //var ccc = cc.toString(); //convert to string
        
            var ccCheck = /^([0-9]{15,16}|[0-9]{13})$/; //checking for numbers only, required length
            var ccResult = ccCheck.test(cc);
            if (cc === "" || ccResult === false) {
                window.console.log("Credit card number must be 13, 15, or 16 digits.");
                $("cc_number").style.backgroundColor = "#ffe2e2";
                $("cc_number").style.borderColor = "red";
                $("ccnvalid").innerHTML = "&nbsp;Credit card number must be 13, 15, or 16 digits.";
                $("cc_number").focus();
                } else {
                    $("cc_number").style.backgroundColor = "#d4ffc4";
                    $("cc_number").style.borderColor = "green";
                    $("ccnvalid").innerHTML = "";
                    return true;
                }//checkCCType(); 
            }
    
    
            function checkCCType () {
                var cc = $("cc_number").value; //numerical value
                var ccc = cc.toString(); //convert to string
        
                var ccCheck;
                if ((ccc.length === 13 || ccc.length === 16) && ccc.charAt(0) === "4") {
                    window.console.log("Visa");
                    $("cardtype").innerHTML = "Visa";
                    ccCheck = true;
                } else if (ccc.length === 15 && ccc.charAt(0) === "3" && ccc.charAt(1) === "7") {
                    window.console.log("Amex");
                    $("cardtype").innerHTML = "Amex";
                    ccCheck = true;
                } else if (ccc.length === 16 && ccc.charAt(0) === "5" && (ccc.charAt(1) === "1"|"2"|"3"|"4"|"5")) {
                    window.console.log("MasterCard");
                    $("cardtype").innerHTML = "MasterCard";
                    ccCheck = true;
                } else {
                    window.console.log("INVALID CARD NUMBER");
                    ccCheck = false;
                    $("cc_number").style.backgroundColor = "#ffe2e2";
                    $("cc_number").style.borderColor = "red";
                    $("ccnvalid").innerHTML = "&nbsp;Credit card number is not valid.";
                    $("cc_number").focus();
                    //window.console.log(ccc.charAt(0));
                } if (ccCheck === true) {
                    $("cc_number").style.backgroundColor = "#d4ffc4";
                    $("cc_number").style.borderColor = "green";
                    $("ccnvalid").innerHTML = "";
                    return true;//luhnFormula();
            } 
        }
    
    
    $("backtostart").addEventListener("click", function () {
       location.reload(); 
    });
    
    $("submit3").addEventListener("click", function () {
       
        //validate billing info using variant of main address validation
        
        validateForm2();
        
        //validate that month + year > current month + year ... get current year, convert to format, compare
        
        //window.console.log(d.getMonth());
        checkCCLength();
         
        checkDates();
        checkCVC();
        
        if (validateForm2() && checkCCLength() && checkDates() && checkCVC()) {
            luhnFormula();
        }
            
            function luhnFormula() {
                var cc = $("cc_number").value; //numerical value
                var ccc = cc.toString(); //convert to string
        
                var lTest = [], lTest2 = [], lTestX = [], sumUp = 0, sumRemaining = 0;
                
                window.console.log("Luhn");
                var l1 = ccc.split("");
                window.console.log(l1);
                //Reverse string
                var l2 = l1.reverse();
                window.console.log(l2);
                
                function extractEveryOther() {
                //Push every other digit starting with second from left
                for (var i = 0; i <= l2.length; i += 2) {
                    var l3 = l2[i-1];
                    if (l3 != undefined) {
                    lTest.push(l3);
                    }
                }
                //Push remaining digits into an array    
                for (var x = -1; x <= l2.length; x += 2) {
                    var l4 = l2[x-1];
                    if (l4 != undefined) {
                    lTest2.push(l4);
                    }
                } 
                    window.console.log(lTest);
                    window.console.log(lTest2);     
                }                    
                extractEveryOther();
                
                //double each number in lTest and push to array
                
                function doubleBreakAdd() {
                for (var i = 0; i < lTest.length; i++) {
                    lTestX.push(parseInt(lTest[i] * 2));
                } window.console.log(lTestX);
            
                //convert to String - doubled values to individual digits
                var lX = lTestX.toString();
                lX = lX.replace(/,/g,"");
                window.console.log(lX);
                
                //convert String back to Array
                var l5 = lX.split("");
                window.console.log(l5);
                
                for (var x = 0; x < l5.length; x++) {
                    sumUp += parseInt(l5[x]);
                } window.console.log(sumUp);
                } 
                doubleBreakAdd();
                
                //Add all the remaining digits together
                for (var i = 0; i < lTest2.length; i++) {
                    sumRemaining += parseInt(lTest2[i]);
                } window.console.log(sumRemaining);
                
                var finalSum = parseInt(sumRemaining + sumUp);
                function finalCheck() {
                    var ccModulus = finalSum % 10;
                    window.console.log("The remainder is : " + ccModulus);
                    if (ccModulus === 0) {
                        window.console.log("Success!");
                        $("form3").style.display = "none";
                        $("demo").style.display = "none";
                        $("jumbotron2").style.display = "block";
                    } else {
                        $("cc_number").style.backgroundColor = "#ffe2e2";
                        $("cc_number").style.borderColor = "red";
                        $("cc_number").value = "";
                        $("cardtype").innerHTML = "";
                        $("ccnvalid").innerHTML = "&nbsp;Card number is invalid - please re-enter.";
                        $("cc_number").focus();
                        //window.console.log("Number invalid.");
                        //window.alert("INVALID CARD NUMBER");
                    }
                } finalCheck();
            } 
        
        // if valid length + prefix, luhn formula
        // Convert to string
        // Reverse
        // Start at 2nd from left
        // Extract every other number (to array?)
        // loop(?) thru array, doubling each number
        // concatenate to string (each double digit number is two separate) then break to array(?)
        // extract remaining numbers from string then break to array(?)
        // add all the digits
        // divide by 10
        // if modulus equals 0, card is valid.
    
        //}
        }); 
    });
    
    
    
