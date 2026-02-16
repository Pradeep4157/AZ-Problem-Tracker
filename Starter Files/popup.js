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
    // parent div that contains both title and image div
    const newBookMark = document.createElement('div');
    // div that contains problem name
    const bookmarkTitle = document.createElement('div');
    // div that contains both add and remove image
    const bookmarkControls = document.createElement('div');
    newBookMark.setAttribute( "url", bookmark.url);
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
function onPlay(event) {
    //  this function will get executed when the  user clicks on the question in the extension.
    // now the even.target is the button that i have pressed.
    // i somehow need to access the url which is present in the bookmark..
    // event's parent has bookmark.name, this add image and del image..
    // i cannot access bookmark functionalities direclty because that is not related to this.. 
    // maybe i can search for the name and then access the url.. 
    // another way is that we can add the url in the problem's attribute and using .parent.parent we can access that 
    // attribute.. 
    // first we access the url and then 
    const url = event.target.parentElement.parentElement.getAttribute("url");
    chrome.tabs.create({ url: url});


}
function onDelete(event) { 
    // this function gets executed when the user wants to remove the question from the extension.
    // when clicked we can remove the parent's parent from the dom.. 
    // along with that we also need to remove it from the storage else it appears agian when the extension reloads..
    const bookMarkDiv = event.target.parentElement.parentElement;
    const urlToDelete = bookMarkDiv.getAttribute("url");
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookMarks = data[AZ_PROBLEM_KEY] || [];
        const updateBookMarks = currentBookMarks.filter(
            bookmark => bookmark.url !== urlToDelete
        )
        chrome.storage.sync.set({
            [AZ_PROBLEM_KEY]: updateBookMarks
        });

    });
    event.target.parentElement.parentElement.remove();

    



}
