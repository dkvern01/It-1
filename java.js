//Kobling til html Elementer

const inpNavn = document.querySelector("#inpNavn");
const inpMeld = document.querySelector("#inpMeld");
const divMeld = document.querySelector("#meldinger");
const btnSlett = document.querySelector("#btnSlett");


//Kobling til database
const db = firebase.firestore();
const chat = db.collection("chat");

//Sender data fra html elementene og legger det i chat kolleksjonen med fra : Input og tekst: input
function leggTilMeld() {
chat.add({
  fra: inpNavn.value,
  tekst: inpMeld.value
})
}

//for å hente data fra databsaen skriver du vanligvis Kolleksjon.get().then((snapshot) => SkrivResultat(snapshot))
//Nå bruker vi en annen komando

chat.onSnapshot(snapshot => skrivResultat(snapshot));

//Funksjonen som tar inn alle dataene på en gang og behandler dem

function skrivResultat(snapshot){
  snapshot.docChanges().forEach((element) => lagHTML(element.doc.data()));
}

// Funksjon som tar inn data og lager html kode
function lagHTML(ll){
divMeld.innerHTML += `
<div>Navn: ${ll["fra"]}</div>
<div>Melding: ${ll["tekst"]}</div>
`
}

function slettHistorikk() {
divMeld.innerHTML = ""
}
