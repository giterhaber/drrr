//usertool footer
let profileState = `<span id="hide">hide me!</span><br><br>
   <span id="online">🔵</span>&nbsp;
   <span id="in-game">🟢</span>&nbsp;
   <span id="offline">⚪️</span>&nbsp;
   <br><br>
   <input id="id64" type="text" placeholder="765yawa">&nbsp;
   <button id="inserId">🎲</button>
`;
document.querySelector("#userTools").innerHTML = profileState;

//hideme function
let hideMe = document.querySelector("#hide");
hideMe.addEventListener("click", hideFunction);
function hideFunction() {
  document.querySelector("#userTools").style.display = "none";
}
//onlineState
document.querySelector("#online").addEventListener("click", onlineFunction);
function onlineFunction() {
  document
    .querySelector("#profileState")
    .setAttribute("class", "playerAvatar profile_header_size online");
}

//in-gameState
document.querySelector("#in-game").addEventListener("click", ingameFunction);
function ingameFunction() {
  document
    .querySelector("#profileState")
    .setAttribute("class", "playerAvatar profile_header_size in-game");
}

//offline-state
document.querySelector("#offline").addEventListener("click", offlineFunction);
function offlineFunction() {
  document
    .querySelector("#profileState")
    .setAttribute("class", "playerAvatar profile_header_size offline");
}

//api and id
//api format

let apiText =
  "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=1D44637D2A3CEEF85B9DCE9D42B54C08&steamids=";

//get input value id64

let id64Value = document.querySelector("#id64");

let getid64 = document
  .querySelector("#inserId")
  .addEventListener("click", getidFunction);
function getidFunction() {
  combine = apiText + id64Value.value;
  console.log(combine);

  //inserted getjson
  $.getJSON(combine, function (data) {
    var text = `
           img: ${data.response.players[0].avatarmedium}
           <br>
           name: ${data.response.players[0].personaname}
           <br>
   
       `;

    console.log(text);
    //$(".mypanel").html(text);
    document.querySelector(".playerAvatarAutoSizeInner").innerHTML = `
           <img src="${data.response.players[0].avatarmedium}">
       `;
    document.querySelector(".player_name").innerHTML = `
       ${data.response.players[0].personaname}
       `;
  });
}
