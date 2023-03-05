import NewsApiService from "./js/news_api-service";
import articlesTpl from './templates/articles.hbs';
import LoadMoreBtn from "./js/load-more_btn";

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('.button[data-action="load-more"]')
}
const newsApiService = new NewsApiService();//робимо екземпляр класу
const loadMoreBtn = new LoadMoreBtn({//екземпляр класу з кнопкою
  selector: '[data-action="load-more"]',
  hidden: true
});

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', fetchArticles)

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;//записуємо в сетер класу NewsApiService значення з інпуту
  if (newsApiService.query === '') {
    return alert('Введіть параметр пошуку')
  }

  loadMoreBtn.show();
  newsApiService.resetPage();//при кожному сабміті скидуємо сторінку до одиниці
  clearArticlesContainer();//виклик ф-ції очищення розмітки
  fetchArticles();
}


function fetchArticles() {
  loadMoreBtn.disable();//виключаємо кнопку loadmore
  newsApiService.fetchArticles().then(articles => {
    appendArticlaesMarkup(articles);//передаємо в then ф-цію розмітки
    loadMoreBtn.enable();//включаємо кнопку
  })
}

function appendArticlaesMarkup(articles) {//ф-ція розмітки
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles))
}

function clearArticlesContainer() {//ф-ція очищення розмітки при кожному сабміті
  refs.articlesContainer. innerHTML = ''
}
