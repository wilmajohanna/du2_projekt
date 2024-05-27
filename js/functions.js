
// G
// CODE According to specification
function click_filter_element(event) {
  const filter_element = event.target;
  filter_element.classList.toggle('selected');
  update_programmes();
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */

}


// G
// CODE according to specification
function create_filter_element(data) {

  const list_element = document.createElement("li");
  list_element.className = data.class;
  data.parent.appendChild(list_element);
  list_element.textContent = data.textContent;
  list_element.addEventListener("click", click_filter_element);
  return list_element;


  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

}


// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}


// VG
// CODE according to specifications
function toggle_cities(event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters() {

  /*
    NO ARGUMENTS

    SIDE-EFFECTS
    This function creates country filter containers

    NO RETURN VALUE

  */
  function create_country(country) {

    /*
      ARGUMENT
      The function takes an object as argument.
        
      SIDE-EFFECTS
      The function creates a container (div) using an object from the COUNTRIES array.
        
      NO RETURN VALUE
        */

    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }

  function create_city(city) {

    /*
    ARGUMENTS
    This function takes an object as argument.

    SIDE-EFFECTS
    The function generates filter elements by employing the create_filter_element function, utilizing the values of the keys of the argument (object) as arguments for create_filter_element. The created filter is then appended to the matching countries. 

    NO RETURN VALUE
    */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.

function create_filters(object) {

  /*
  NO ARGUMENTS

  SIDE-EFFECTS
  This function creates list-item elements with an id-number as attribute and 
      text content from the LANGUAGES, LEVELS, and SUBJECTS arrays. It then appends the list-items as children to the unordered-lists within the different containers i.e level_filter, subject_filter, and language_filter.

  NO RETURN VALUE
  */

  function array_function(array_element) {
    let filter_elements = create_filter_element({
      parent: document.querySelector(`#${object.name}_filter ul`),
      class: "selected",
      textContent: array_element.name

    });
    filter_elements.dataset.id = array_element.id
  }
  array_each(object.array_element, array_function)
}


// G 
// CODE according to specifications
function create_programme(programme) {

  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
     
      G:  No background image required.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */


  let grid = document.querySelector('#programmes ul');

  let parent_box = document.createElement('div');
  parent_box.classList.add("programme");
  grid.appendChild(parent_box);

  first_child = document.createElement('li');
  parent_box.appendChild(first_child);

  let second_child = document.createElement('li');
  parent_box.appendChild(second_child);


  let information = {

    uni: UNIVERSITIES[programme.universityID].name,
    city: CITIES[UNIVERSITIES[programme.universityID].cityID].name,
    country: COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name,

    level: LEVELS[programme.levelID - 1].name,
    subject: SUBJECTS[programme.subjectID].name,
    language: LANGUAGES[programme.languageID].name,

    sun: CITIES[UNIVERSITIES[programme.universityID].cityID].sun,

    images: CITIES[UNIVERSITIES[programme.universityID].cityID].imagesNormal[0]

  };

  let sun_percent = percenter(information.sun, 365);


  first_child.innerHTML = `<h1>${programme.name}</h1>
        <p>${information.uni}</p>
        <p>${information.city}, ${information.country}</p>
        <p>${information.level}, ${information.subject}, ${information.language}`
  second_child.innerHTML = `<p>${information.city}, sun-index:${information.sun} (${sun_percent}%)</p>`
  second_child.classList.add('bottom_programme');

  parent_box.style.backgroundImage = `url(../media/geo_images/${information.images})`

}


// G
// CODE according to the specification
function update_programmes() {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

      NO RETURN VALUE

  */

  let programme = document.querySelector("#programmes ul");
  programme.innerHTML = "";
  array_each(read_filters(), create_programme);
  let empty_string = document.querySelector("#programmes p");

  if (programme.innerHTML !== "") {
    empty_string.style.display = "none";
  } else {
    empty_string.style.display = "block";
  }
}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

function read_filters() {

  /*
  NO ARGUMENTS

  SIDE-EFFECTS
    This function creates arrays based on the selected filter elements.

  RETURN VALUE
    Returns an array of the programme-elements matched with the "selected" filters. 
  */

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);


  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
