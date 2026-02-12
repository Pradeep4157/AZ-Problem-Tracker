const bookMarkImageURL = chrome.runtime.getURL('assets/bookmark.png');
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";

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

async function addNewBookMarkHandler(){
  
  const currentBookMarks = await getCurrentBookMarks();
  
  const azProblemUrl = window.location.href;
  const uniqueId = extractUniqueId(azProblemUrl);
  if(currentBookMarks.some((bookMark) => bookMark.id === uniqueId)) return;
  // if not returned then add this question to the extension
  const problemName = document.getElementsByClassName('coding_problem_info_heading__G9ueL')[0].innerText;
  const bookMarkObj = {
    url : azProblemUrl,
    name : problemName,
    id : uniqueId
  }
  const updatedBookMarks = [...currentBookMarks,bookMarkObj];
  // now set it in sync storage
  chrome.storage.sync.set({AZ_PROBLEM_KEY : updatedBookMarks}, () => {
    console.log('Updated the current Book Mark');
  });
}
function extractUniqueId(url){
  // we find the index where the problems/ ends and we find the index where ? starts
  // and extract the substring in between them to get the id..
  const start = url.indexOf("problems/") + "problems/".length;
  const end = url.indexOf("?",start);
  return end === -1 ? url.substring(start) : url.substring(start,end);
}

function getCurrentBookMarks(){
  
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (results) => {
      if (chrome.runtime.lastError) {
        console.log("here is the error");
        reject(chrome.runtime.lastError);
      } else {
        resolve(results[AZ_PROBLEM_KEY] || []);
      }
    });
  });
}