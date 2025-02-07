import { catsData  } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById("get-image-btn");

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            } 
        }
    }
    return emotionsArray;
}


function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for = "${emotion}">${emotion}</label>
            <input type = "radio" id = "${emotion}" value = "${emotion}" name = "emotions" />
        </div>
        
        `
    }
    emotionRadios.innerHTML = radioItems;
}

function highlightCheckedOption(e) {
    const allItems = document.querySelectorAll(".radio");
    for (let item of allItems) {
        item.classList.remove("highlight")
    }
    const selectedRadio = document.getElementById(e.target.id);
    selectedRadio.parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
    if(document.querySelector("input[type='radio']:checked")) {
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value;
        console.log(selectedEmotion);
    }
}

renderEmotionsRadios(catsData);

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", getMatchingCatsArray);