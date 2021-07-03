//Elementleri seçme

const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const github = new Github();
const ui=new UI();
eventListeners();
function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let userName = nameInput.value.trim();
    if(userName===""){
        alert("Lütfen geçerli bir kullanıcı adı girin.");
    }
    else { 
        github.getGithubData(userName)
        .then(response=> {
            if (response.user.message==="Not Found"){
                 //Hata
                ui.showError("Kullanıcı bulunamadı")
            }
            else {
                ui.addSearchedUserToUI(userName);
                Storage.addSearchedUserToStorage(userName);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));
    }
    ui.clearInput(); //İnputu  Temizleme
    e.preventDefault();
}

function clearAllSearched(){
    //Tüm arananları temizle
    if (confirm("Emin misiniz?")){
        // Silme 
       Storage.clearAllSearchedusersFromStorage();//Storageden temizleme
       ui.clearAllSearchedFromUI();
    }


}
function getAllSearched(){
    // Arananları Storageden al ve Ui ekle

    let users=Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result+=` <li class="list-group-item>${user}</li> `;
    });
    lastUsers.innerHTML=result;

}
