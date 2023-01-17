import  axiosInstance from "/scripts/instanse.js";
let list;
axiosInstance.get('/products/category/smartphones').then((data) => {
     console.log(data);
     localStorage.setItem("list",JSON.stringify(data.data.products))
     list = JSON.parse(localStorage.getItem('list')) || [];
});

function WatchList()
{
    let string = '';
    list = JSON.parse(localStorage.getItem("list"));
    if(list == null)
    {
        alert("Empty localstroage");
    }
    else list.forEach((item) => {
        string += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title" id="title">${item.title}</h5>
    <p class="card-text" id ="description">${item.description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" id = "price">${item.price}</li>
    <li class="list-group-item" id = "rate">${item.rating}</li>

  </ul>
  <div class="card-body">
    <button onclick="showUpdateModal(${item.id})" class="btn btn-primary" aria-current="page" data-toggle="modal" data-target="#update-modal">Update</button>
    <button onclick="showDeleteModal(${item.id})" class="btn btn-primary" aria-current="page" data-toggle="modal" data-target="#delete-card">Delete</button>
  </div>
</div>`
    })
 let container = document.getElementById("card-container");
    container.innerHTML = string;
}
WatchList();

function CreateCard()
{
   let newCard ={};
   newCard.title = document.getElementById('create-input-title').value;
   newCard.description = document.getElementById('create-input-description').value;
   newCard.price = document.getElementById('create-input-price').value;
   newCard.rating = document.getElementById('create-input-rating').value;
   newCard.id = list.length + 1;
   list.push(newCard);
   localStorage.setItem("list",JSON.stringify(list));
   WatchList();
}

function UpdateCard()
{
    let id = document.getElementById('id-update').value;
    list.map((item) => {
        if(item.id === +id)
        {
            item.title = document.getElementById('update-input-title').value;
            item.description = document.getElementById('update-input-description').value;
            item.price = document.getElementById('update-input-price').value;
            item.rating = document.getElementById('update-input-rating').value;
        }
        return item
    })
    localStorage.setItem("list",JSON.stringify(list));
    WatchList();
}

function DeleteCard()
{
    let id = document.getElementById('id-delete').value;
    axiosInstance = list.filter((item) => item.id !== +id);
    localStorage.setItem("list",JSON.stringify(list));
    WatchList();
}
function showUpdateModal(id)
{
  document.getElementById("id-update").value = id;
}
function showDeleteModal(id)
{
    document.getElementById("id-delete").value = id;
}
