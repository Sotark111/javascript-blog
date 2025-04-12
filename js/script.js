const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  // Remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // For each article
  const articles = document.querySelectorAll(optArticleSelector);
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

generateTitleLinks();
