let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ //works when used as extension
        const newLink = {
            value: tabs[0].url,
            isDescription: false
        }
        myLinks.push(newLink)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

inputBtn.addEventListener("click", function(){
    if (inputEl.value.trim() === "") return; 

    const newDesc = {
        value: inputEl.value,
        isDescription: true
    }
    myLinks.push(newDesc)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++){
        const content = links[i].value 
        if (links[i].isDescription){
            listItems += `<li>${content}</li>`
        }else{
            listItems += `
                <li>
                    <a target='_blank' href='${content}'>
                        ${content}
                    </a>
                </li>
            `
        }
    }
    ulEl.innerHTML = listItems
}

