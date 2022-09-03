const allNews = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
     const data = await res.json();
    return data;
}


const displayCategory = async() =>{
    const result = await allNews();
    const  datas =  result.data.news_category;
    for(const data of datas){
        const id = data.category_id;
        const nav = document.getElementById('navbarNavAltMarkup');
        const div = document.createElement('div');
        
        div.innerHTML = `
        <a class="nav-link" href="#" onclick="categoryId(${id})">${data.category_name}</a>
        `
        nav.appendChild(div);
        // const news_id = data.category_id;
        // fetch(`https://openapi.programming-hero.com/api/news/category/${news_id}`)
        // .then(res => res.json())
        // .then(data1 => display1(data1))
    }
    
}
 displayCategory();

 function categoryId(a){
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/0${a}`)
    .then(res => res.json())
    .then(data1 => display2(data1.data))
 }

const display2 = async(datas) =>{
   
    const newsDiv = document.getElementById('news-found');
    newsDiv.textContent = '';
    const h3 = document.createElement('h4');
      const len = datas.length;
    const sec = document.getElementById('card-section');
    sec.textContent = '';
    if(len === 0){
        h3.innerHTML = `${len} items found`
        newsDiv.appendChild(h3);
      const h2 = document.createElement('h3');
      h2.innerHTML = "No data found";
      sec.appendChild(h2);
      toggleSpinner(false)
    }
    else{
        h3.innerHTML = `${len} items found`
        newsDiv.appendChild(h3);
     for(const data of datas){
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mb-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.details.length > 400 ? data.details.slice(0,400) + '...' : data.details}</p>
              <div class="d-flex flex-row">
              <img src="${data.author.img}" class="img-fluid  rounded-circle" alt="..." style="width: 50px; height: 50px;">
               <div class="d-flex mt-2 gap-5">
               <p class="card-text  ms-2"><small>${data.author.name}</small></p>
               <p>${data.rating.number}M</p>
               <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModal('${data.title}','${data.image_url}')">
               Show details
               </button>

               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
        sec.appendChild(div);
        toggleSpinner(false);
     } 
  }
}

 const showModal = (description,img) =>{
    const modalDiv = document.getElementById('modal-body');
    modalDiv.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${img}" class=" img-fluid rounded-start" alt="...">
    <p>${description}</p>
    ` 
    modalDiv.appendChild(div);
 }

 const toggleSpinner = (isLoading) =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
     spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
 }
