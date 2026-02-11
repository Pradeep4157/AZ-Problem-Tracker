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
    bookMarkButton.addEventListener('click',addNewBookMarkHandler);
}

// 
addBookMarkButton();
const observer = new MutationObserver(addBookMarkButton);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

function addNewBookMarkHandler(){
  const azProblemUrl = window.location.href;
  const uniqueId = extractUniqueId(azProblemUrl);
  console.log(uniqueId);

}
function extractUniqueId(url){
  // we find the index where the problems/ ends and we find the index where ? starts
  // and extract the substring in between them to get the id..
  const start = url.indexOf("problems/") + "problems/".length;
  const end = url.indexOf("?",start);
  return end === -1 ? url.substring(start) : url.substring(start,end);
}