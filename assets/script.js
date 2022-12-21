//firebase import
import firebase from "https://cdn.skypack.dev/firebase/compat/app";
import "https://cdn.skypack.dev/firebase/compat/auth";
import "https://cdn.skypack.dev/firebase/compat/firestore";


const config = {
    apiKey: "AIzaSyCPHRgTbpTzocHnBJ6YDDtS6pzweIjYxII",
    authDomain: "manaboss.firebaseapp.com",
    projectId: "manaboss",
    storageBucket: "manaboss.appspot.com",
    messagingSenderId: "1050200231775",
    appId: "1:1050200231775:web:a8aa47a0b96c29347930ea",
    measurementId: "G-JPSW086DN4"
}

firebase.initializeApp(config);
const db = firebase.firestore();

//preventDEFAULT
$('form').on('submit', (e) => {
    e.preventDefault()
})

function content(data) {

const textForm = `
    <dl id="${data.image}" class="talk ${data.image}">
    <dt></dt>
    <dd>
    <div class="bubble">
    <p class="body">${data.message}</p>
    </div>
    </dd>
    </dl>
`;

$('#talks').prepend(textForm)

}//

function system(content) {
    const text = `
    <div class="talk system">-- ${content}</div>
    `;

    $('#talks').prepend(text)
}

function toast(content, color) {
    Toastify({
        text: `${content}`,
        offset: {
            y: 2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        duration: -1,
        destination: false,
        newWindow: false,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: `${color}`,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

//ACCOUNT CREATION LATER

//site EDIT
$('#room_name').hide()
$('[name=logout]').hide()

//LOGIN
function login() {
    let userName, userPass;

    if (localStorage.getItem('user') === null) {
    //wala
    userName = prompt('name: ')
    userPass = prompt('pass: ')

    db.collection('chat-account').doc(userName).get().then( (doc) => {
        const pass = doc.data().password
        const user = doc.data().user
        const image = doc.data().image
    if (userPass === pass) {
        localStorage.setItem('user', user)
        localStorage.setItem('image', image)
        update()
    }

    if (userPass !== pass) {
        location.reload()
    }

    })//

    } else {
        console.log('logged in');
    }
}
login()
//function UPDATE LOG ACCOUNT
function update() {
    const userChange = localStorage.getItem('user')
    const text = location.href.slice(-11)
    return db.collection('chat-account').doc(userChange).update({
        log: text
    }).then( () => {
        console.log('success');
    }).catch( () => {
        console.log('error');
    })
}

//test button
$('.submit').append(`
<input type="button" id="test-button" value="TEST BUTTON">
`)


//LISTENER TOAST
db.collection("chat-account").onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {  //if you want only changes
        let user,log,color;
        user = change.doc.data().user
        log = change.doc.data().log
        color = change.doc.data().color
        toast(`${user} @${log}`, `${color}`)
    });
  });

//COMMANDS
function commands() {
    const command = $('textarea').val()

    $('textarea').on('input', (e) => {
        const cmd = e.target.value

        if (cmd === '!commands') {
            system('!change !delete !report')
        }
        
        if (cmd === '!change') {
            const userChange = localStorage.getItem('user')
            return db.collection('chat-account').doc(userChange).update({
                log: 'disconnected'
            }).then( () => {
                console.log('success');
                localStorage.clear()
                location.reload()
            }).catch( () => {
                console.log('error');
            })
            
        }

        if (cmd === '!delete') {
            window.open('./krimen/deleteyourlife.html')
        }

        if (cmd === '!report') {
            window.open('./krimen/reportformat.html')
        }
    })

}
commands()

//chat
$('#POST').on('click', send)
$("textarea").on("keydown", function(e){
    if(e.which == 13){
      send();
      return false;
    }
  });

function send() {
   const getUser = localStorage.getItem('user')
   const getImage = localStorage.getItem('image')
   const getMessage = $('textarea').val()

   const data = {
    image: getImage,
    message: getMessage,
    user: getUser,
    time: new Date()
   }

   const chatRef = db.collection('chat')
   chatRef.add(data)
    .then( () => {
        console.log('chat added');
    })
    $('textarea').val('')

}//

db.collection("chat").orderBy("time").onSnapshot((querySnapshot) => {
    // console.log("querySnapshot.docs.length: " + querySnapshot.docs.length);
    //querySnapshot.forEach((doc) => {  //if you want all
    
    setTimeout(() => {
        const identify = $('#talks').find('dl').attr('id')
        if (identify !== localStorage.getItem('image')) {
            //audioplay
            PLAY()
        } else {

        }
    }, 2000);

    querySnapshot.docChanges().forEach((change) => {  //if you want only changes
        content(change.doc.data());
        //playSound()
    });

  });

  function PLAY() {
    const audio = new Audio('./drrr.mp3');
    audio.play();
}