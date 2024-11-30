const allSections = document.querySelectorAll('section');
const navBarMenu = document.getElementById('navbar__list');

const buildNavBar = () => {
  //I am using fragment for performance purposes
  const fragment = document.createDocumentFragment();

  allSections.forEach((section) => {
    const sectionId = section.id;
    const sectionName = section.dataset.nav;

    const navItem = document.createElement('li');
    navItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
    //fill fragment and when finish it then append to navbar__list
    fragment.appendChild(navItem);
  });
  navBarMenu.appendChild(fragment);
};

// Check if a section is in the viewport
const isInViewport = (section) => {
  const rect = section.getBoundingClientRect();
  return rect.top >= -150 && rect.top <= 150;
};

const activateSection = (section) => {
  const navLink = document.querySelector(`a[href="#${section.id}"]`);
  section.classList.add('active-section');
  navLink.classList.add('active');
};

const deactivateSection = (section) => {
  const navLink = document.querySelector(`a[href="#${section.id}"]`);
  section.classList.remove('active-section');
  navLink.classList.remove('active');
};

const updateSectionState = (section) => {
  if (isInViewport(section)) {
    activateSection(section);
  } else {
    deactivateSection(section);
  }
};

const onActiveSection = () => {
  allSections.forEach((section) => updateSectionState(section));
};

const preventDefaultAction = (event) => {
  event.preventDefault();
};

const getSectionFromLink = (link) => {
  const sectionId = link.getAttribute('href').substring(1);
  return document.getElementById(sectionId);
};

const onAddSmoothScrolling = () => {
  navBarMenu.addEventListener('click', (event) => {
    preventDefaultAction(event);
    if (event.target.tagName === 'A') {
      const section = getSectionFromLink(event.target);
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

buildNavBar();

onAddSmoothScrolling();

document.addEventListener('scroll', onActiveSection);
