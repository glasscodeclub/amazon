
window.addEventListener("load",start)

function start (){
  const d = document,
        cShake = document.getElementById("card-shake"),  
        ccForm = d.querySelector(".card-form"), 
        cNumber = d.querySelectorAll(".card-number"), 
        ccNumber = ccForm.querySelector("#card-number"),
        ccMonth = ccForm.querySelector("#expires-month"),
        cMonth = d.querySelectorAll(".card__exp-month"),
        ccYear = ccForm.querySelector("#expires-year"), 
        cYear = d.querySelectorAll(".card__exp-year"),
        ccCCV = ccForm.querySelector("#card-cvc"), 
        cCCV = d.querySelectorAll(".card__cvc-2"),
        defaultNumberN = cNumber[0].querySelectorAll(".card__span")[0].innerHTML,  
        defaultNumberM = cMonth[0].querySelectorAll(".card__span")[0].innerHTML,  
        defaultNumberY = cYear[0].querySelectorAll(".card__span")[0].innerHTML, 
        defaultNumberC = cCCV[0].querySelectorAll(".card__span")[0].innerHTML
      
  payment()
  
  function payment (ev){
    ev = ev || window.event

    let cardNumber, cardCCV
    addEvent(ccNumber, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccNumber, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccMonth, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccMonth, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccYear, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccYear, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccCCV, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccCCV, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccNumber, "keyup", function (){
      cardNumber = this.value.replace(/[^0-9\s]/g,'')

      if (!!this.value.match(/[^0-9\s]/g)){
        this.value = cardNumber
      }
      parts = numSplit(cardNumber.replace(/\s/g,''), [4,4,4,4])
      cardNumber = parts.join(' ')
      if (cardNumber != this.value){
        this.value = cardNumber
      }
      if (!cardNumber){
        cardNumber = defaultNumberN
      }

      syncText(cNumber, cardNumber)   
    })

    addEvent(ccMonth, "keyup", function (){
      let month = this.value.replace(/[^0-9]/g,'')
      if (ev.keyCode == 38){
        if (!month){month = 0}
        month = parseInt(month)
        month++
        if (month < 10){
          month = "0"+month
        }
      }

      if (ev.keyCode == 40){
        if (!month){month = 13}
        month = parseInt(month)
        month--
        if (month == 0){ month = 1} 
        if (month < 10){
          month = "0"+month
        }
      }

      if (parseInt(month) > 12){month = 12}
      if ( parseInt(month) < 1 && month != 0){month = "01"}
      if (month == "00"){month = "01"}
      if (month >= "2" && month <= "9"){
        month = "0"+month
      }
      if (month != this.value){
        this.value = month
      }
      if (!month){
        month = defaultNumberM
      }

      syncText(cMonth, month) 
    })

    addEvent(ccYear, "keyup", function (){
      let currentYear = new Date().getFullYear().toString().substr(2,2),
          year = this.value.replace(/[^0-9]/g,'')
      if (ev.keyCode == 38){
        if (!year){year = currentYear}
        year = parseInt(year)
        year++
        if (year < 10){
          year = "0"+year
        }
      }

      if (ev.keyCode == 40){
        if (!year){
          year = parseInt(currentYear) + 5
        }
        year = parseInt(year)
        year--
        if (year < 10){
          year = "0"+year
        }
      }

      if (year.toString().length == 2 && parseInt(year) < currentYear){
        year = currentYear
      }
      if (year != this.value){
        this.value = year
      }
      if (year > (parseInt(currentYear) + 5)){
        year = (parseInt(currentYear) + 5)
        this.value = year
      }
      if (!year){
        year = defaultNumberY
      }

      syncText(cYear, year)
    })

    addEvent(ccCCV, "keyup", function (){
      cardCCV = this.value.replace(/[^0-9\s]/g,'')

      if (cardCCV != this.value){
        this.value = cardCCV
      }
      if (!cardCCV){
      cardCCV = defaultNumberC
      }

    syncText(cCCV, cardCCV)
    })
  }

  function addEvent (elem, event, func){
    elem.addEventListener(event, func)
  } 
  
  function syncText (elCol, text){
    let collection
    for (let j=0; j < elCol.length; j++){
      collection = elCol[j].querySelectorAll(".card__span")
      if (!collection.length){
        elCol[j].innerHTML = text
      } else{
        for (let i=0; i < collection.length; i++){
          collection[i].innerHTML = text
        }
      }
    }
  } 

  function numSplit(number, indexes){
    let tempArr = number.split(''),
        parts = []
    for (var i=0, l = indexes.length; i < l; i++){
      if (tempArr.length){
        parts.push(tempArr.splice(0,indexes[i]).join('')) 
      }
    }
    return parts;
  }  
}