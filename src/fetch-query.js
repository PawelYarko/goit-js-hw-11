import Notiflix from 'notiflix';
export default class NewSearchQuery{
    constructor(){
        this.searchQuery = '';  
        this.page = 1;  
    }

    fetchArticles(){
        const API = 'https://pixabay.com/api/';
        const API_KEY = '26762966-8ed2dcb76b4efb10f9cc7c58f';
        const per_page = '40'
    
        const url = `${API}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${this.page}`;
        return fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
        this.incrementPage();
        // return data.hits;
        return data;
        })
    }

    incrementPage(){
        this.page += 1;
    }

    resetePage(){
        this.page = 1;
    }

    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
}
