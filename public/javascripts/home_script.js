/**
 * Update selected reviews to home page.
 */
function updateReviews() {
  let reviews = local_reviews;
  if (typeof reviews !== "undefined") {
    const cookies = document.cookie.split(';');
    let cookie_user;
    for(let i = 0; i < cookies.length; i++){
      const split = cookies[i].split('=');
      if(split[0].trim() == "current_user_info"){
        cookie_user = split[1];
      }
    }
    let currentUserNameValue = "";
    let currentUserEmailValue = "";
    if (typeof cookie_user !== undefined && cookie_user !== 'undefined') {
      let parseString = decodeURIComponent(cookie_user);
      parseString = parseString.substring(parseString.indexOf("{")).substring(0, parseString.lastIndexOf("}") + 1);
      const parseUser = JSON.parse(parseString);
      currentUserNameValue = parseUser.current_user_name;
      currentUserEmailValue = parseUser.user_email;
    }

    document.getElementById("display_area").innerHTML = "";
    const displayArea = document.getElementById("display_area");
    let reviewId = 0;
    for (let record of reviews) {
      const reviewArea = document.createElement("div");
      reviewArea.setAttribute("id", "review" + reviewId++);
      reviewArea.setAttribute("class", "review_display");
      const currentReviewId = record.reviewId;
      const userName = record.userName;
      const userEmail = record.userEmail;
      const beverageName = record.beverageName;
      const beverageType = record.beverageType;
      const img = record.img;
      const rating = record.rating;
      const review = record.review;

      const userNameElement = document.createElement("p");
      userNameElement.innerHTML = userName;
      userNameElement.setAttribute("class", "display_user_name");
      const beverageNameElement = document.createElement("span");
      beverageNameElement.innerHTML = "Name: " + beverageName;
      beverageNameElement.setAttribute("class", "display_beverage_name");
      const beverageTypeElement = document.createElement("span");
      beverageTypeElement.innerHTML = "Type: " + beverageType;
      beverageTypeElement.setAttribute("class", "display_beverage_type");
      const imgElement = document.createElement("img");
      imgElement.setAttribute("src", "data:image/png;base64," + img);
      imgElement.setAttribute("alt", "default");
      imgElement.setAttribute("class", "display_img");
      const ratingElement = document.createElement("span");
      ratingElement.innerHTML = "Rating: " + rating;
      const ratingSet = document.createElement("span");
      ratingSet.setAttribute("class", "rating_set review_rating");
      ratingSet.textContent = "★★★★★";
      const ratingDisplay = document.createElement("span");
      ratingDisplay.setAttribute("class", "star_rating");
      ratingDisplay.setAttribute("id", "rating" + reviewId);
      ratingDisplay.textContent = "★★★★★";
      ratingSet.appendChild(ratingDisplay);
      ratingElement.setAttribute("class", "display_rating");
      const reviewElement = document.createElement("p");
      reviewElement.innerHTML = "Review: " + review;
      reviewElement.setAttribute("class", "display_review");

      const reviewForm = document.createElement("form");
      reviewForm.setAttribute('action', 'display');
      reviewForm.setAttribute('method', 'post');
      const reviewIdForm = document.createElement("input");
      reviewIdForm.type = 'hidden';
      reviewIdForm.name = 'review_id';
      reviewIdForm.value = currentReviewId;
      const currentUserNameForm = document.createElement("input");
      currentUserNameForm.type = 'hidden';
      currentUserNameForm.name = 'current_user_name';
      currentUserNameForm.value = currentUserNameValue;
      const currentUserEmailForm = document.createElement("input");
      currentUserEmailForm.type = 'hidden';
      currentUserEmailForm.name = 'current_user_email';
      currentUserEmailForm.value = currentUserEmailValue;
      const userNameForm = document.createElement("input");
      userNameForm.type = 'hidden';
      userNameForm.name = 'user_name';
      userNameForm.value = userName;
      const userEmailForm = document.createElement("input");
      userEmailForm.type = 'hidden';
      userEmailForm.name = 'user_email';
      userEmailForm.value = userEmail;
      const beverageNameForm = document.createElement("input");
      beverageNameForm.type = 'hidden';
      beverageNameForm.name = 'beverage_name';
      beverageNameForm.value = beverageName;
      const beverageTypeForm = document.createElement("input");
      beverageTypeForm.type = 'hidden';
      beverageTypeForm.name = 'beverage_type';
      beverageTypeForm.value = beverageType;
      const beverageImgForm = document.createElement("input");
      beverageImgForm.type = 'hidden';
      beverageImgForm.name = 'beverage_img';
      beverageImgForm.value = img;
      const beverageRatingForm = document.createElement("input");
      beverageRatingForm.type = 'hidden';
      beverageRatingForm.name = 'beverage_rate';
      beverageRatingForm.value = rating;
      const beverageReviewForm = document.createElement("input");
      beverageReviewForm.type = 'hidden';
      beverageReviewForm.name = 'beverage_text';
      beverageReviewForm.value = review;
      const displayButton = document.createElement("input");
      displayButton.setAttribute("class", "detail-btn");
      displayButton.type = 'submit';
      displayButton.value = 'more detail';
      reviewForm.appendChild(reviewIdForm);
      reviewForm.appendChild(currentUserNameForm);
      reviewForm.appendChild(currentUserEmailForm);
      reviewForm.appendChild(userNameForm);
      reviewForm.appendChild(userEmailForm);
      reviewForm.appendChild(beverageNameForm);
      reviewForm.appendChild(beverageTypeForm);
      reviewForm.appendChild(beverageImgForm);
      reviewForm.appendChild(beverageRatingForm);
      reviewForm.appendChild(beverageReviewForm);
      reviewForm.appendChild(displayButton);

      reviewArea.appendChild(userNameElement);
      reviewArea.appendChild(imgElement);
      reviewArea.appendChild(beverageNameElement);
      reviewArea.appendChild(beverageTypeElement);
      reviewArea.appendChild(ratingElement);
      reviewArea.appendChild(ratingSet);
      reviewArea.appendChild(document.createElement("br"));
      reviewArea.appendChild(reviewElement);
      reviewArea.appendChild(reviewForm);

      displayArea.appendChild(reviewArea);
      document.getElementById("rating" + reviewId).style.width = (Math.floor(rating / 5.0 * 100)).toString() + "%";

    }
  }
}

/**
 * Update the options for beverage type selector.
 */
function updateFilter() {
  let beverages = local_beverages;
  const filterSelector = document.getElementById("beverage_type");
  for (let type in beverages) {
    const option = document.createElement("option");
    option.text = type;
    option.value = type;
    filterSelector.add(option);
  }
}

/**
 * Update the header including user name.
 */
function updateUserInfo() {
  document.getElementsByClassName("navigation-bar")[0].innerHTML = "";
  const header = document.getElementsByClassName("navigation-bar")[0];
  const logo = document.createElement("img");
  logo.setAttribute("class", "logo");
  logo.setAttribute("src", "https://happylemonusa.com/wp-content/uploads/2022/01/V1.0-PLUS_HEAD-60.png");
  logo.setAttribute("alt", "HappyLemon Logo");
  header.appendChild(logo)
  const cookies = document.cookie.split(';');
  let cookie_user;
  for(let i = 0; i < cookies.length; i++){
    const split = cookies[i].split('=');
    if(split[0].trim() == "current_user_info"){
      cookie_user = split[1];
    }
  }

  let writeUserNameValue = "";
  const writeUserName = document.getElementById("write_user_name");
  let editUserNameValue = "";
  const editUserName = document.getElementById("edit_user_name");
  let editUserEmailValue = "";
  const editUserEmail = document.getElementById("edit_user_email");
  if (typeof cookie_user !== undefined && cookie_user !== 'undefined') {
    let parseString = decodeURIComponent(cookie_user);
    parseString = parseString.substring(parseString.indexOf("{")).substring(0, parseString.lastIndexOf("}") + 1);
    const parseUser = JSON.parse(parseString);
    const userName = document.createElement("div");

    userName.setAttribute("class", "user-info");
    userName.setAttribute("id", "user_name");
    userName.textContent =  "Welcome, " + parseUser.current_user_name;
    const logout = document.createElement("a");
    logout.setAttribute("href", "/logout");
    logout.setAttribute("class", "btn-log");
    logout.text = "Logout";
    header.appendChild(logout);
    header.appendChild(userName);

    if (document.getElementById('review')) {
      document.getElementById('review').disabled = false;
    }

    writeUserNameValue = parseUser.current_user_name;
    if (writeUserName) {
      writeUserName.setAttribute("value", writeUserNameValue);
    }
    editUserNameValue = parseUser.current_user_name;
    if (editUserName) {
      editUserName.setAttribute("value", editUserNameValue);
    }
    editUserEmailValue = parseUser.user_email;
    if (editUserEmail) {
      editUserEmail.setAttribute("value", editUserEmailValue);
    }
  } else {
    const login = document.createElement("a");
    login.setAttribute("href", "/google");
    login.setAttribute("class", "btn-log");
    login.text = "Login";
    header.appendChild(login);

    if (document.getElementById('review')) {
      document.getElementById('review').disabled = true;
    }
    if (writeUserName) {
      writeUserName.setAttribute("value", writeUserNameValue);
    }
    if (editUserName) {
      editUserName.setAttribute("value", editUserNameValue);
    }
    if (editUserEmail) {
      editUserEmail.setAttribute("value", editUserEmailValue);
    }
  }
}

/**
 * Update the header for Edit and Display page including user name.
 */
function updateEditDisplayUserInfo() {
  document.getElementsByClassName("navigation-bar")[0].innerHTML = "";
  const header = document.getElementsByClassName("navigation-bar")[0];
  const logo = document.createElement("img");
  logo.setAttribute("class", "logo");
  logo.setAttribute("src", "https://happylemonusa.com/wp-content/uploads/2022/01/V1.0-PLUS_HEAD-60.png");
  logo.setAttribute("alt", "HappyLemon Logo");
  header.appendChild(logo)
  const cookies = document.cookie.split(';');
  let cookie_user;
  for(let i = 0; i < cookies.length; i++){
    const split = cookies[i].split('=');
    if(split[0].trim() == "current_user_info"){
      cookie_user = split[1];
    }
  }

  let writeUserNameValue = "";
  const writeUserName = document.getElementById("write_user_name");
  let editUserNameValue = "";
  const editUserName = document.getElementById("edit_user_name");
  let editUserEmailValue = "";
  const editUserEmail = document.getElementById("edit_user_email");
  if (typeof cookie_user !== undefined && cookie_user !== 'undefined') {
    let parseString = decodeURIComponent(cookie_user);
    parseString = parseString.substring(parseString.indexOf("{")).substring(0, parseString.lastIndexOf("}") + 1);
    const parseUser = JSON.parse(parseString);
    const userName = document.createElement("div");

    userName.setAttribute("class", "user-info");
    userName.setAttribute("id", "user_name");
    userName.textContent =  "Welcome, " + parseUser.current_user_name;
    header.appendChild(userName);

    if (document.getElementById('review')) {
      document.getElementById('review').disabled = false;
    }

    writeUserNameValue = parseUser.current_user_name;
    if (writeUserName) {
      writeUserName.setAttribute("value", writeUserNameValue);
    }
    editUserNameValue = parseUser.current_user_name;
    if (editUserName) {
      editUserName.setAttribute("value", editUserNameValue);
    }
    editUserEmailValue = parseUser.user_email;
    if (editUserEmail) {
      editUserEmail.setAttribute("value", editUserEmailValue);
    }
  } else {
    const login = document.createElement("a");
    login.setAttribute("href", "/google");
    login.setAttribute("class", "btn-log");
    login.text = "Login";
    header.appendChild(login);

    if (document.getElementById('review')) {
      document.getElementById('review').disabled = true;
    }
    if (writeUserName) {
      writeUserName.setAttribute("value", writeUserNameValue);
    }
    if (editUserName) {
      editUserName.setAttribute("value", editUserNameValue);
    }
    if (editUserEmail) {
      editUserEmail.setAttribute("value", editUserEmailValue);
    }
  }
}

/**
 * Update the total rating information to home page.
 */
function updateTotalRating() {
  let total_rating = local_average_rating;
  document.getElementById("tr").style.width = (Math.floor(local_average_rating / 5.0 * 100)).toString() + "%";
}

/**
 * Update the options for beverage name selector.
 */
function updateEditPageBeverage() {
  let beverages = local_beverages;
  const filterSelector = document.getElementById("beverage_name");
  for (let type in beverages) {
    for (let name of beverages[type]) {
      const option = document.createElement("option");
      option.text = name;
      option.value = name;
      option.setAttribute("id", name);
      option.setAttribute("beverage_type", type);
      filterSelector.add(option);
    }
  }
}

/**
 * update display content in display page
 */
function updateDisplayArea() {
  let displayContent = local_display_content;
  const current_user_name = displayContent.current_user_name;
  const user_name = displayContent.user_name;
  const review_id = displayContent.review_id;
  const beverage_name = displayContent.beverage_name;
  const beverage_type = displayContent.beverage_type;
  const beverage_img = displayContent.beverage_img;
  const beverage_rate = displayContent.beverage_rate;
  const beverage_review_text = displayContent.beverage_review_text;

  const displayUserName = document.getElementById("display_card_user_name");
  const displayBeverageImg = document.getElementById("display_card_img");
  const displayBeverageName = document.getElementById("display_card_beverage_name");
  const displayBeverageType = document.getElementById("display_card_beverage_type");
  const displayBeverageRate = document.getElementById("display_card_beverage_rate");
  const displayBeverageReview = document.getElementById("display_card_beverage_review_text");
  displayUserName.textContent = "Reviewer: " + user_name;
  displayBeverageImg.setAttribute("src", "data:image/png;base64," + beverage_img);
  displayBeverageName.textContent = "Beverage name: " + beverage_name;
  displayBeverageType.textContent = "Beverage type: " + beverage_type;
  displayBeverageRate.textContent = "Beverage rating: " + beverage_rate;
  displayBeverageReview.setAttribute("placeholder", beverage_review_text);
}


/**
 * update edit content in display page
 */
function updateEditArea() {
  let displayContent = local_display_content;
  const current_user_name = displayContent.current_user_name;
  const current_user_email = displayContent.current_user_email;
  const user_name = displayContent.user_name;
  const user_email = displayContent.user_email;
  const review_id = displayContent.review_id;
  const beverage_name = displayContent.beverage_name;
  const beverage_type = displayContent.beverage_type;
  const beverage_img = displayContent.beverage_img;
  const beverage_rate = displayContent.beverage_rate;
  const beverage_review_text = displayContent.beverage_review_text;

  const editDisplayBeverageName = document.getElementById("beverage_name");
  const options = editDisplayBeverageName.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].text.indexOf(beverage_name) > -1) {
      options[i].selected = true;
      break;
    }
  }
  const editDisplayBeverageType = document.getElementById("display_beverage_type");
  editDisplayBeverageType.textContent = beverage_type;
  const editBeverageType = document.getElementById("beverage_type");
  editBeverageType.value = beverage_type;

  const editDisplayBeverageRate = document.getElementById("display_beverage_rate");
  editDisplayBeverageRate.textContent = beverage_rate;
  const editBeverageRate = document.getElementById("beverage_rate");
  editBeverageRate.value = beverage_rate;

  const editUserName = document.getElementById("edit_user_name");
  editUserName.value = current_user_name;

  const editUserEmail = document.getElementById("edit_user_email");
  editUserEmail.value = current_user_email;

  const editDisplayBeverageReviewText = document.getElementById("review_text");
  editDisplayBeverageReviewText.setAttribute("placeholder", beverage_review_text);
  editDisplayBeverageReviewText.value = beverage_review_text;

  const editReviewId = document.getElementById("review_id");
  editReviewId.value = review_id;
}

/**
 * Set the checkbox for the same user with the current reviewer.
 */
function displayCheckCurrentUser() {
  let displayContent = local_display_content;
  const current_user_email = displayContent.current_user_email;
  const user_email = displayContent.user_email;
  if (current_user_email === user_email) {
    document.getElementById("edit_check").disabled = false;
    document.getElementById("edit_check_label").textContent = "This is your review. Check to modify. Remember to add a new photo :)"
  }
}

/**
 * Set the write review button. If login, the button is not disabled; Otherwise, disabled.
 */
function checkLogin() {
  const cookies = document.cookie.split(';');
  let cookie_user;
  for(let i = 0; i < cookies.length; i++){
    const split = cookies[i].split('=');
    if(split[0].trim() == "current_user_info"){
      cookie_user = split[1];
    }
  }

  if (typeof cookie_user === undefined || cookie_user === 'undefined') {
    console.log(1);
    document.getElementById("write_review_button").setAttribute("disabled", true);
    document.getElementById("write_review_button").setAttribute("value", "Login to write reviews");
  }
}


