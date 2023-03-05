export default class NewsApiService {
  constructor() {
    this.searchQuery = '';//сюди записуємо введені дані в інпут (дані записуються в файлі індекс.js)
    this.page = 1;//поточна сторінка пагінації .. номер групи
  }

  fetchArticles() {
    console.log(this)
    const options = {
      headers: {
        'X-Api-Key': 'eeda972c75574db08cda1ad756be828c'//news api key  eeda972c75574db08cda1ad756be828c
    },
}
    const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}
&language=en&pageSize=5&page=${this.page}`

return fetch(url, options)
  .then(r => r.json())
  .then(({articles}) => {
    this.page += 1//збільшуємо сторінку на 1 кожного разу при fetchі

    return articles//повертаємо масив об'єктів
  })
  }

  resetPage() {
    this.page = 1//скидуємо поточну сторінку на одиницю кожного разу при сабміті
  }

  get query() { //робимо гетер і сетер щоб в зовнішньому коді мати доступ до змінної searchQuery де ми зберігаємо введені дані в input
    return this.searchQuery
  }
  set query(newQuery) {
    this.searchQuery = newQuery
  }
}
