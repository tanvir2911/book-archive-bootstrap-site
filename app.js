// some info for you in the below comment


// search field 
const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    toggleSpinner('block');
    toggleSearchResult('none');
    toggleSearchResultsNumber('none');
    loadBooks(searchText);
    document.getElementById('search-field').value = '';
}

// toggle functions
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displaySearch => {
    document.getElementById('books-results').style.display = displaySearch;
}
const toggleSearchResultsNumber = displaySearchNumbers => {
    document.getElementById('results-number').style.display = displaySearchNumbers;
}


// fetching
const loadBooks = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
}

// loop and create search results
// I don't khonw why grid columns doesn't work when i try to show more than one item in a row. That's why I removed the grid style, but i pushed it in my previous commit so that you can review it. I will be glad if you give me the feedback of my previous commit why didn't it worked. I wasted my two days trying to resolve it... 
// please..
const bookNames = books => {
    const container = document.getElementById('books-results');
    container.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h4  class="card-title">${book.title}</h4>
                <h5>Author name: ${book.author_name}</h5>
                <h6 >First published in: ${book.first_publish_year ? book.first_publish_year : ''}</h6>
            </div >
        </div >
        `;
        container.appendChild(div);
    });
}

// result numbers
const searchResultsNumber = results => {
    const resultsNumber = document.getElementById('results-number');
    resultsNumber.textContent = ''
    const p = document.createElement('p');
    p.innerText = `Tolal ${results} search results found`;
    resultsNumber.appendChild(p);
}


// display function
const displayBooks = books => {
    bookNames(books.docs);
    searchResultsNumber(books.numFound)
    toggleSpinner('none');
    toggleSearchResult('block');
    toggleSearchResultsNumber('block');
}