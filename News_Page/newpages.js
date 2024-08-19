const API_KEY = "dd76d142ba2542cab05e14cce4c3e434";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll("nav ul li");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(el => el.classList.remove("active"));
            item.classList.add("active");
        });
    });
});

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('newscontainer');
    const newscardTemplate = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newscardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#imgd');
    const newsTitle = cardClone.querySelector('#title');
    const newsSource = cardClone.querySelector('#source');
    const newsDesc = cardClone.querySelector('#dis');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url,"_blank");
    });

}
function onNavItemClick(id)
{
    fetchNews(id);
}
const searchText = document.getElementById('input');
const searchButton = document.getElementById('submit');

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
});
const itemList = document.getElementById('list');
itemList.addEventListener("click", (event) => {
    if (event.target.tagName === 'LI') {
        searchText.value = '';
    }
});
