fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(data => display(data.data.news_category));


const display = datas =>{
    for(const data of datas){
        const nav = document.getElementById('navbarNavAltMarkup');
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="nav-link" href="#">${data.category_name}</a>
        `
        nav.appendChild(div);
    }
}