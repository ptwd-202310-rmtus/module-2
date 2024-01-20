// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("edit-title").onclick = function(){
        document.getElementById("the-title").style.display = "none";
        document.getElementById("edit-title").style.display = "none";
        document.getElementById("edit-title-input").style.display = "inline";
    }

    function restoreTitleDOM(){
        document.getElementById("the-title").style.display = "inline";
        document.getElementById("edit-title").style.display = "inline";
        document.getElementById("edit-title-input").style.display = "none";
    }


    document.getElementById("cancel-title").onclick = function(){
        restoreTitleDOM();
    }

    document.getElementById("submit-title").onclick = async ()=>{
        const newTitle = document.querySelector("#edit-title-input input").value;
        const id = document.getElementById("edit-title-input").dataset.theid;

        const update = await axios.post(`/books/api/edit/${id}`, {title: newTitle});
        console.log(update);
        restoreTitleDOM();
        document.getElementById("the-title").innerText = update.data.title;     
    }








    document.getElementById("edit-year").onclick = function(){
        document.getElementById("the-year").style.display = "none";
        document.getElementById("edit-year").style.display = "none";
        document.getElementById("edit-year-input").style.display = "inline";
    }

    function restoreYearDOM(){
        document.getElementById("the-year").style.display = "inline";
        document.getElementById("edit-year").style.display = "inline";
        document.getElementById("edit-year-input").style.display = "none";
    }

    document.getElementById("cancel-year").onclick = function(){
        restoreYearDOM();
    }



    document.getElementById("submit-year").onclick = async ()=>{
        const newyear = document.querySelector("#edit-year-input input").value;
        const id = document.getElementById("edit-year-input").dataset.theid;

        const update = await axios.post(`/books/api/edit/${id}`, {year: newyear});
        console.log(update);
        restoreYearDOM();
        document.getElementById("the-year").innerText = update.data.year;     
    }


    
      
    });