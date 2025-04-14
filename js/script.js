const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  // Remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // For each article
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (const article of articles) {
    // Get the article id
    const articleId = article.getAttribute('id');

    // Find the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // Create HTML of the link
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // Insert link into titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  // Add click event listeners to the new links
  const links = titleList.querySelectorAll('a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

const titleClickHandler = function(event) {
  event.preventDefault();

  // Remove 'active' class from all article links
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  // Add 'active' class to the clicked link
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  // Remove 'active' class from all articles
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  // Get 'href' attribute from the clicked link
  const articleSelector = clickedElement.getAttribute('href');

  // Find the correct article using the selector
  const targetArticle = document.querySelector(articleSelector);

  // Add 'active' class to the correct article
  targetArticle.classList.add('active');
};

function generateTags() {
  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // Loop through all articles
  for (const article of articles) {
    // Find tags wrapper
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    // Make HTML variable with an empty string
    let html = '';

    // Get tags from data-tags attribute
    const articleTags = article.getAttribute('data-tags');

    // Ensure articleTags exists before splitting
    if (articleTags) {
      // Split tags into array
      const articleTagsArray = articleTags.split(' ');

      // Loop through each tag and generate HTML for the link
      for (let tag of articleTagsArray) {
        const tagHTML = '<li><a href="#tag-' + tag.trim() + '" data-tag="' + tag.trim() + '">' + tag.trim() + '</a></li>';
        html += tagHTML; 
      }
    }

    // Insert HTML of all the links into the tags wrapper
    tagsWrapper.innerHTML = html;
  }
}

function tagClickHandler(event) {
  // Prevent default action for this event
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tag = clickedElement.getAttribute('data-tag');

  /* make a new constant "tag" and extract tag from the "href" constant */
  generateTitleLinks('[data-tags~="' + tag + '"]');

  // Find all active tag links and remove active class
  const activeTagLinks = document.querySelectorAll('a.active');
  /* START LOOP: for each active tag link */

  for (let activeTag of activeTagLinks) {
    /* remove class active */
    activeTag.classList.remove('active');
  }

  // Add active class to the clicked tag link
  clickedElement.classList.add('active');
}

function addClickListenersToTags() {
  // Find all links to tags
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  // Add event listener for each link
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const author = article.getAttribute('data-author');

    
    if (author) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

     
      if (authorWrapper) {
        const authorHTML = '<a href="#author-' + author.trim() + '">' + author.trim() + '</a>';
        authorWrapper.innerHTML = authorHTML;
      }
    }
  }
}

function authorClickHandler(event) {
 
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  
  const activeAuthorLinks = document.querySelectorAll('a.active');
  for (let activeAuthor of activeAuthorLinks) {
    activeAuthor.classList.remove('active');
  }

  
  clickedElement.classList.add('active');

 
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}


generateAuthors();
addClickListenersToAuthors();
addClickListenersToTags();
generateTags();
generateTitleLinks();
