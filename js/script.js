const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (const article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  const links = titleList.querySelectorAll('a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

const titleClickHandler = function(event) {
  event.preventDefault();

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (optCloudClassCount - 1)) + 1;
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags ? articleTags.split(' ') : [];

    for (let tag of articleTagsArray) {
      html += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagsWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';

  for (let tag in allTags) {
    const count = allTags[tag];
    const tagClass = calculateTagClass(count, tagsParams);
    allTagsHTML += '<li><a class="' + tagClass + '" href="#tag-' + tag + '" data-tag="' + tag + '">' + tag + '</a></li>';
  }

  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const tag = clickedElement.getAttribute('data-tag');

  generateTitleLinks('[data-tags~="' + tag + '"]');

  const activeTagLinks = document.querySelectorAll('a[href^="#tag-"].active');
  for (let activeTag of activeTagLinks) {
    activeTag.classList.remove('active');
  }

  clickedElement.classList.add('active');
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const author = article.getAttribute('data-author');

    if (author) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      const authorHTML = '<a href="#author-' + author.trim() + '">' + author.trim() + '</a>';
      authorWrapper.innerHTML = authorHTML;

      // Liczenie wystąpień autora
      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
    }
  }

  // Generowanie listy autorów w prawej kolumnie
  const authorList = document.querySelector(optAuthorsListSelector);

  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    allAuthorsHTML += '<li><a href="#author-' + author + '" data-author="' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
  }

  authorList.innerHTML = allAuthorsHTML;
}

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a[href^="#author-"].active');
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

generateTags();
generateAuthors(); 
generateTitleLinks(); 
addClickListenersToTags();
addClickListenersToAuthors(); 