const bookMarkImageURL = chrome.runtime.getURL('assets/bookmark.png');


function addBookMarkButton(){
    const question = document.querySelector(".coding_problem_info_heading__G9ueL");
    if(!question) return;
    if(question.querySelector('#add-bookmark-button')) return;
    const bookMarkButton = document.createElement('img');
    bookMarkButton.id = 'add-bookmark-button';
    bookMarkButton.src = bookMarkImageURL;
    bookMarkButton.style.marginLeft = '8px';
    bookMarkButton.style.height='30px';
    bookMarkButton.style.width = '30px';
    bookMarkButton.style.cursor = 'pointer';
    question.appendChild(bookMarkButton);
}

// 
addBookMarkButton();
const observer = new MutationObserver(addBookMarkButton);
observer.observe(document.body, {
  childList: true,
  subtree: true
});