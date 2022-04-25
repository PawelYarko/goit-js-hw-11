import NewSearchQuery from './fetch-query';
import searchCardTpl from './query-card';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const newSearchQuery = new NewSearchQuery();
const searchForm = document.querySelector('.search-form');

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit' , onSearchFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreQuery);

function onSearchFormSubmit(e){
    e.preventDefault();
   
    newSearchQuery.query = e.currentTarget.elements.searchQuery.value;
    newSearchQuery.resetePage();
    newSearchQuery.fetchArticles()
    .then(data => {
        toggleBtnLoadMore();
        alertTotalAmountQuery(data.total);
        clearHitsContainer();
        renderSearchQueryCard(data.hits);
    })
    .catch(error =>{
        console.log(error);
    });

}

function renderSearchQueryCard(hits){
    console.log(hits);
    
    if(hits.length === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        loadMoreBtn.classList.add('is-hidden');  
    }else{
        buildMarkup(hits);
    }
    
    
    let lightbox = new SimpleLightbox('.gallery a', {});
    lightbox.refresh();
}

function buildMarkup(hits){
    gallery.insertAdjacentHTML('beforeend', searchCardTpl(hits)) ;
}

function loadMoreQuery(e){
    newSearchQuery.fetchArticles()
    .then(data => renderSearchQueryCard(data.hits))
    .catch(error =>{
        console.log(error);
    });
}

function clearHitsContainer(){
    gallery.innerHTML = '';
}

function alertTotalAmountQuery(totalHits){
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function toggleBtnLoadMore(){
    loadMoreBtn.classList.add('is-hidden');
    loadMoreBtn.classList.toggle('is-hidden');
}



