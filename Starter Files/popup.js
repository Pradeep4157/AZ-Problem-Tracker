/*
    so when we open that extension it loads that page from start..

    so we can just we DOMContentLoaded to load all the problems from the storage..


*/
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";
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
    
}