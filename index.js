import { catsData  } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const closeBtn = document.getElementById("meme-modal-close-btn");

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
        const isGif = gifsOnlyOption.checked;

        const selectedEmotion = document.querySelector("input[type='radio']:checked").value;
        
        const matchingCatsArray = catsData.filter((cat) => {
            if(isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        });
        return matchingCatsArray;
    }
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();

    if(catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `
    <img
    class="cat-img"
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    />`;
    memeModal.style.display = "flex";
}

function closeModal() {
    memeModal.style.display = "none";
}

renderEmotionsRadios(catsData);

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderCat);

closeBtn.addEventListener("click", closeModal);