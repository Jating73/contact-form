AOS.init();

var firebaseConfig = {
    apiKey: "AIzaSyDai0_kidDKK7rtbAE93Zsy8KKc7MkYX-g",
    authDomain: "career-dream-contact-form.firebaseapp.com",
    projectId: "career-dream-contact-form",
    storageBucket: "career-dream-contact-form.appspot.com",
    messagingSenderId: "77398625776",
    appId: "1:77398625776:web:f6d54cb85da81bb24e2135",
    measurementId: "G-E4JJKCV3WE"
  };
  // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

//Refrence messages Collection
// var messagesRef = firebase.database().ref('messages');
// var storageRef = firebase.storage().ref('messages');


//Get Selected value
function getVal()
{
   let val= document.querySelector('select').value;
   return val;
}

//Listen for Form Submit
//document.getElementById('contactForm').addEventListener('submit',submitForm);

//Submit Form
function submitForm(e){
    e.preventDefault();
    
    // Get values
    const name= getInputVal('floatingName');
    const email=getInputVal('floatingEmail');
    const phone=getInputVal('floatingContact');
    const wap=getInputVal('floatingWhatsapp');
    const college=getInputVal('floatingCollege');
    const refrence=getInputVal('floatingRefrence');
    const degree=getInputVal('floatingQualification');
    const selected=getVal();
    const file = document.querySelector('#formFile').files[0];

    //Checking validation
        if(name=='' || email=='' || phone=='' || wap=='' || college=='' || refrence=='' || degree=='' || file.name=='')
    {
        document.querySelector('.fields').style.display='block';
        setTimeout(function(){
        document.querySelector('.fields').style.display='none';
        },5000);
        return;
    }
    else if(!name || !email)
    {
        document.querySelector('.valid').style.display='block';
        setTimeout(function(){
        document.querySelector('.valid').style.display='none';
        },5000);
        return;
    }



    const filename=new Date()+ '-' +file.name

    const metadata={
        contentType:file.type
    }

    const task=storageRef.child(filename).put(file,metadata);
    
    //Save Message
    task
    .then(snapshot=>snapshot.ref.getDownloadURL())
    .then(url=>{
        console.log(url)
        saveMessage(name,email,phone,wap,college,refrence,degree,selected,url);
    });

    //Show Alert
    document.querySelector('.alert').style.display='block';

    //Hide Alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display='none';
    },3000);

    //Clear Form
    document.getElementById('contactForm').reset();
}

//function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(name,email,phone,wap,college,refrence,degree,selected,url){
    var newMessageRef=messagesRef.push();
    newMessageRef.set({
        name:name,
        email:email,
        phone:phone,
        whatsapp:wap,
        college:college,
        refrence:refrence,
        degree:degree,
        internship:selected,
        cv:url
    })
}