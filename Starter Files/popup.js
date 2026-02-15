/*
    so when we open that extension it loads that page from start..

    so we can just we DOMContentLoaded to load all the problems from the storage..


*/

/*
we have the div in which we want to store the images.. 

now we will create a function that is going to do this .. 

we will pass the image location, the div container in which we want to store the image and we will also pass the function that is going to get executed 

on click...

we will define a general function that is going to do both the add and remove task for us. 

becuase the flow is same just the diff is in onclick.







*/
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";

const assetsMapUrl = {
    "play" : chrome.runtime.getURL("assets/play.png"),
    "delete" : chrome.runtime.getURL("assets/delete.png")
}
const bookMarkSection = document.getElementById("bookmarks");
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) =>{
        const currentBookMarks = data[AZ_PROBLEM_KEY] || [];
        viewBooks(currentBookMarks);
    });
});

function viewBooks(currentBookMarks){
    bookMarkSection.innerHTML = "";
    if(currentBookMarks.length === 0){
        bookMarkSection.innerHTML = "<p>Add some problem Dumbass</p>"
        return;
    }
    currentBookMarks.forEach( bookMark => addNewBookMark(bookMark));

}

function addNewBookMark(bookmark){
    
    const newBookMark = document.createElement('div');
    
    const bookmarkTitle = document.createElement('div');
    const bookmarkControls = document.createElement('div');
    bookmarkTitle.textContent = bookmark.name;

    bookmarkTitle.classList.add('bookmark-title');
    bookmarkControls.classList.add('bookmark-controls');
    buttonOperations(assetsMapUrl["play"], onPlay, bookmarkControls);
    buttonOperations(assetsMapUrl["delete"], onDelete, bookmarkControls);
    newBookMark.classList.add('bookmark');
    newBookMark.append(bookmarkTitle);
    newBookMark.append(bookmarkControls);
    bookMarkSection.appendChild(newBookMark);
    

    
}
function buttonOperations(srcImage, funcOnClick, parentDiv){
    // first we add the image in the container and attach this function whenever the button image is clicked..
    const IMAGE = document.createElement('img');
    IMAGE.src = srcImage;
    // now we append this image to the parent container..
    parentDiv.appendChild(IMAGE);
    // and now we are going to add the functionality of onclick..
    IMAGE.addEventListener("click",funcOnClick);


}
function onPlay() {
    //  this function will get executed when the  user clicks on the question in the extension.
}
function onDelete() { 
    // this function gets executed when the user wants to remove the question from the extension.



}
