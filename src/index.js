import searchCardTpl from './query-card';


const searchForm = document.querySelector('.search-form');
const formSubmit = document.querySelector('.btn-submit');
const formInput = document.querySelector('.searchQuery');

const gallery = document.querySelector('.gallery');


searchForm.addEventListener('submit' , onSearchFormSubmit);

function onSearchFormSubmit(e){
    e.preventDefault();

    console.log(formInput.value)
    const searchQuery = formInput.value;
    fetchQuery(searchQuery)
    .then(renderSearchQueryCard)
    .catch(error =>{
        console.log(error);
    });

}

function fetchQuery(searchQuery){
    const url = `https://pixabay.com/api/?key=26762966-8ed2dcb76b4efb10f9cc7c58f&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
    const options = {
        "total": 4692,
        "totalHits": 500,
        }
    return fetch(url)
    .then(response =>{
        return response.json();
    })
}

function renderSearchQueryCard(query){
    const markup = searchCardTpl(query);
    gallery.innerHTML = markup;
}

