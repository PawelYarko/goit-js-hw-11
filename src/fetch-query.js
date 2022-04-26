export default class NewSearchQuery{
    constructor(){
        this.searchQuery = '';  
        this.page = 1;  
    }

    async fetchArticles(){
        const axios = require('axios');
        try{
            const API = 'https://pixabay.com/api/';
            const API_KEY = '26762966-8ed2dcb76b4efb10f9cc7c58f';
            const per_page = '40'
            const url = `${API}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${this.page}`;
        
            const response = await axios.get(url);
              this.incrementPage();   
              return response.data
        } catch (error) {
            console.error(error);
          }
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
