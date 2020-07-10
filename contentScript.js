let leftControls = document.querySelector('div.ytp-left-controls');
let noteButton = document.createElement('button');
let youtubeBody = document.querySelector('body');

let video = document.querySelector('video')
let currentUrl = document.URL;

noteButton.textContent = "Create Note";
leftControls.appendChild(noteButton);
noteButton.addEventListener('click', () => makeNote());

function makeNote(){
    video.pause();
    createNoteForm();

}

function createNoteForm(){
    //Note form elements
    let formDiv = document.createElement('div');
    formDiv.style.cssText = "position: absolute; right: 20px; top: 60px; height: 200px; background-color: white;"
    formDiv.setAttribute("id", "form-div");
    let closeButton = document.createElement('button');
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", () => closeNoteForm(formDiv));
    let noteInputField = document.createElement('textarea');
    noteInputField.setAttribute("placeholder", "Take a note");
    noteInputField.style.cssText = `height: 16px; overflow-y: hidden`;
    noteInputField.addEventListener('input', textAreaAdjust, false); //Auto resize on input
    noteInputField.name = "inputfield";
    noteInputField.rows = "1";
    noteInputField.maxLength = "16000";
    let noteSubmitButton = document.createElement('button');
    noteSubmitButton.name = "save-button";
    noteSubmitButton.innerHTML = "Save";
    noteSubmitButton.addEventListener("click", () => createNoteObject(noteInputField));
    formDiv.appendChild(closeButton);
    formDiv.appendChild(noteInputField);
    formDiv.appendChild(noteSubmitButton);
    youtubeBody.appendChild(formDiv);
}

function textAreaAdjust(){
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}
function closeNoteForm(formDiv){
    formDiv.remove();
}
function prettyTime(time){
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time % 3600 / 60);
    let seconds = Math.floor(time % 3600 % 60);

    let hDisplay = (hours > 0) ? `${hours}:` : "";
    let mDisplay = (minutes >= 0) ? `${minutes}:` : "";
    let sDisplay = (seconds >= 0) ? toTwoDigits(seconds) : ""
    return hDisplay + mDisplay + sDisplay;
}


function toTwoDigits(number){
    let formattedNumber = ("0" + number).slice(-2);
    return formattedNumber;
}
function createNoteObject(noteInput){
    let videoURL;
    let timeStamp = prettyTime(video.currentTime);
    let videoTitle = document.querySelector('h1.title').firstChild.innerHTML;
    let uploader = document.querySelector('yt-formatted-string.ytd-channel-name').firstChild.innerHTML;
    let noteObject = new Object();
    noteObject.videoURL = currentUrl;
    noteObject.timeStamp = timeStamp;
    noteObject.videoTitle = videoTitle;
    noteObject.uploader = uploader;
    noteObject.note = noteInput.value;
    console.log(noteObject);
    
    noteInput.value = "";

}