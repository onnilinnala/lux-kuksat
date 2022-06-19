/************* GB Plugin API Callback Methods Implementation *************/

/* Callback : gbRequestDidSuccess
*  Called when the Weather API HTTP request is a success.
*/
function gbRequestDidSuccess ( tag, data, src ) {
document.getElementById('replace').innerHTML = ''
  let retrieved = JSON.parse(decodeURIComponent(data))

    retrieved.sort((a, b) => sorter(a, b));
    retrieved.forEach((item, index) => {
      populate(item, index)
    })

}

/* Callback : gbRequestDidSuccessWithCache
*  Called when the Weather API HTTP request is a success and cached.
*/
function gbRequestDidSuccessWithCache ( tag, data, src ) {
document.getElementById('replace').innerHTML = ''
  let retrieved = JSON.parse(decodeURIComponent(data))

    retrieved.sort((a, b) => sorter(a, b));
    retrieved.forEach((item, index) => {
      populate(item, index)
    })
}

  /*
	if (gbUserInfo && gbUserInfo.platform == 'ios'){


    
	    fillPageWithData ( JSON.parse ( data ) );
    }
    else 
    {
	    fillPageWithData ( JSON.parse (decodeURIComponent( data )) );
    }
    */


/* Callback : gbRequestDidFail
*  Called when the Weather API HTTP request failed.
*/
function gbRequestDidFail ( errorCode, errorMessage ){
  const replace =  document.getElementById('replace')
	replace.innerHTML = ''
  replace.innerHTML = 'Jokin meni vikaan, please pass go and collect 200'
}

/* Callback : gbPluginDidLoad
*  Called just after the plugin loading.
*/
function gbPluginDidLoad () {

  const ale = document.getElementById('ale').textContent
  const ika = document.getElementById('ika').textContent
  if (ale === '' || ika === '') {
    gbGetPreference('alaleiri', '1')
    gbGetPreference('ika', '1')
  }


  


 
  
	//hae alaleirinro ja ikäkausi preferennsseistä
  //jos ei ole, kysy ja tallenna
  // kehota päivittämään ohjelma
}
// check for profile selects 
// if no selects, ask
// fetch data with selects as params 
// display data
// separate normal and other? 

function gbDidSuccessGetPreference ( key, valueString ) {
	if ( key === "alaleiri" ) {
    document.getElementById('ale').textContent = valueString
	} else if (key === 'ika') {
    document.getElementById('ika').textContent = valueString
	}
}

function gbDidFailGetPreference ( errorMessage ) {
	alert('Valitse alaleiri ja ikäkausi')
}

function trigger() {
  const ale = document.getElementById('ale').textContent
  const ika = document.getElementById('ika').textContent
  if (ale !== '' || ika !== '') {
    dataGet(ale, ika)
  } else {
    alert('trololoo')
  }

}




function dataGet(camp, group) {
  const url = `https://lux-ohjelma.azurewebsites.net/api/participant?code=8QypsZz9F8Djz59IQBYwAYhoSjs3mjKB2FOaPslGrGDZAzFuWuUVFw==&camp=${camp}&group=${group}`
  gbRequest(url, '1', 'YES')
}

const getData = async () => {
  try {
    let response = await fetch("https://liiga.fi/api/v1/tournament");
    let data = await response.json();

    //data.sort((a, b) => sorter(a, b));

    return data;
  } catch (error) {
    console.log(error);
  }
};

const sorter = (a, b) => {
  return a.start.localeCompare(b.start);
};

const saveToDom = () => {
  const noo = document.getElementById('lpk').value
  const nee = document.getElementById('ikakausi').value
  document.getElementById('ale').textContent = noo
  document.getElementById('ika').textContent = nee
}


const populate = (item, index) => {
  
  let start = new Date(item.start);
  let end = new Date(item.end);
  let displayStart = `${start.getHours()}:${
    start.getMinutes().toString().length > 1
      ? start.getMinutes()
      : "0" + start.getMinutes()
  }`;
  let displayEnd = `-${end.getHours()}:${
    end.getMinutes().toString().length > 1
      ? end.getMinutes()
      : "0" + end.getMinutes()
  }`;

  



//let mukaan = getReq(item.mukaan)

  let markup = `<div class="grid" onClick={openMe(${index})}>
      <div class="activity">${item.tapahtuma}</div>
      <div class="start">${displayStart}</div>
      <div class="end">${displayEnd}</div>
    </div>`
/*
    <div class="modal">
                    <div class="delContainer">
                    <div class="delButton" onClick={closeMe(${index})}>X</div>
                    <div class="modalGrid">
                        <div class="eventName">${item.tapahtuma}</div>
                        <div class="req">${mukaan}</div>
                        <div class="time">${displayStart}-${displayEnd}</div>
                        <div class="place">${item.paikka}</div>
                    </div>
                    </div>
                    

                </div>`;
*/
  document.getElementById("replace").innerHTML += markup;
};

const openMe = (index) => {
  const modals = document.querySelectorAll(".modal")
  modals[index].style.display = 'block'
  //window.alert("lolwut");
};

const closeMe = (index) => {
  const modals = document.querySelectorAll(".modal")
  modals[index].style.display = 'none'

}

const getReq = (arr) => {
  let out = ''
  arr.forEach(x => {
    out += `<li>${x}</li>`
  })
  //out = `<ul>${out}</ul>`
  return out;
}
