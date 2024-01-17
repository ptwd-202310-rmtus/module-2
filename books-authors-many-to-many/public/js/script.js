// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {



const authorImgBtn = document.getElementById("image-edit-author");

authorImgBtn.onclick = function(){
  document.getElementById("img-preview-author").style.visibility = "hidden";
  document.getElementById("img-author-edit-div").style.visibility = "visible";
}





  
});
