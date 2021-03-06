const ipc = require('electron').ipcRenderer


const button= document.getElementById("upload")

const process = require("child_process")

var format='m3u8'

const fs=require("fs")

const $ = require('jquery')

var dir="./media"

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}



$("#upload")

let  videoForm=document.getElementById("videoForm")
let  project=document.getElementById("project")
let body = document.getElementsByTagName("body")[0]
function showForm()
{

project.style.display="none";
videoForm.style.display="block"
body.style.backgroundImage="url('ElectronCGI.jpg')"

}


button.addEventListener("click",function(event){

    ipc.send('open-file-Dialog-for-file')
})

ipc.on("selected-file",function(event,paths){
    console.log(event,paths)

    let info=document.getElementById("info")
        info.innerHTML=`
        <br/>
        <div id="info-id" class= "alert alert-success">
        <p>Video is converting,Please wait</p>
        </div>`

    //converting proccess
    process.exec(`ffmpeg -i "${paths}" media/output.m3u8`,
    function(error,stdout, stderr){
        console.log(stdout)

        let infoId=document.getElementById("info-id")
        infoId.style.display="none";
        
        Notification.requestPermission()
        .then(function(result){
            var notify =new Notification("Convertion Completed",{
                body:"Your file is successfully converted"
            } )
        })

        if(error){
            console.log(error)
        }
    })

})