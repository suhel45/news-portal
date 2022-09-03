const allNews = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
     const data = await res.json();
    return data;
}


const displayCategory = async() =>{
    const result = await allNews();
    const  datas =  result.data.news_category;
    for(const data of datas){
        const nav = document.getElementById('navbarNavAltMarkup');
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="nav-link" href="#">${data.category_name}</a>
        `
        nav.appendChild(div);
        const news_id = data.category_id;
        fetch(`https://openapi.programming-hero.com/api/news/category/${news_id}`)
        .then(res => res.json())
        .then(data1 => display1(data1))
    }
    
}
 displayCategory();

const display1 = input =>{
    const datas = input.data;
    for(const data of datas){
        fetch(`https://openapi.programming-hero.com/api/news/${data._id}`)
        .then(res => res.json())
        .then(data => display2(data.data))
    }
}
 
const display2 = datas =>{
    console.log(datas);
     for(const data of datas){
        const sec = document.getElementById('card-section');
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
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
        sec.appendChild(div);
     }
}
