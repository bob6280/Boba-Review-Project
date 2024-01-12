[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12648355&assignment_repo_type=AssignmentRepo)
# Boba Reviews 🧋🫧🧉☕🫖🍋

Your team will utilize MongoDB and Express to create a review website for Happy Lemon that will let users write reviews and rate their tea orders.

## Part 0 - UX Design

Before working on your code, your team must design low-fidelity wireframes for your application and get them approved by the teaching team via a private post on Piazza. These can be hand-drawn on paper or using tools such as Figma, Miro, or Balsamiq.

## Part 1 - Requirements

* You will have to create this program from scratch but are allowed to use open source web design CSS so long as it is cited and adapted to fit your needs.
* Use express and mogodb with mongoose to manage connections. You do not have to use pug if you do not want to.
* It must have a favicon.
* It must use both GET and POST requests
* Users must be able to include a photo with their review.
* The system will show all reviews and allow to filter by beverage type (milk tea, jasmine green tea, lemon tea, slush, smoothie, etc.).
* Only users with a valid email can post a review (to avoid spam).

The same requirements apply:

* Validated your html (at least what it generates) and have included metadata like in previous assignments.
* Test for contrast with a11y.
* Modified the documentation in the program's comments (for the files you edited) to describe the changes you made. Verify that you are well documenting your code using [JSDoc](https://www.npmjs.com/package/jsdoc) standards. You do not need to generate an API.
* Ensured that you write satisfactory unit tests and that your code passes them, with **75%** coverage, but the code you wrote needs to be completely covered. Testing must include mocking.

## Part 2 - Reflection

Update the README to answer the following questions:

 1. Add screenshots showing your app running on Google Cloud. Add a link to your website. Add a screenshot showing the html on your website has been validated. Also one showing proper contrast.

    Website: https://cs5610-group9-babo-review.wl.r.appspot.com

    Google Cloud:

    1. Home Page:
    ![home_page.png](src%2Fhome_page.png)

    2. Edit Page to write a review:
    ![edit_page.png](src%2Fedit_page.png)
    
    3. Display Page
    ![display page.png](src%2Fdisplay%20page.png)
    
    4. If you are the reviewer of current display review, you can have a chance to modify it.
    ![modify.png](src%2Fmodify.png)

    html validation:
    1. home page validation:
    ![home_html_validation.png](src%2Fhome_html_validation.png)
    
    2. edit page validation
    ![edit_html_validation.png](src%2Fedit_html_validation.png)

    3. display page validation
    ![display_html_validation.png](src%2Fdisplay_html_validation.png)

    Color contrast:
    1. home page
    ![home_a11y.png](src%2Fhome_a11y.png)

    2. edit page
    ![edit_a11y.png](src%2Fedit_a11y.png)
    
    3. diaplay page
    ![display_a11y.png](src%2Fdisplay_a11y.png)

 2. Add screenshots showing your Atlas database before and after your app runs.
    
    Before: we have two databases.
    1. beverages: store type and name of beverages
    ![db_beverages.png](src%2Fdb_beverages.png)
    
    2. beverage_review: store review content
    ![db_review_before.png](src%2Fdb_review_before.png)

    After:
    
    only update beverage_review database: store user's name, user's email, beverage name, beverage type, beverage photo, beverage rating, and beverage review content.
    ![db_review_after.png](src%2Fdb_review_after.png)


3. Each person: Describe your experience working with your team to complete this project. What is one key learning that you're taking away from this experience? What is one thing that you would change?

    Peng Zhang: Working with my team on this project was both challenging and rewarding. One key learning is the importance of clear communication to avoid conflicts and ensure everyone understands their role. As for the edit page I worked on, facilitating user reviews and drink ratings, one thing I would change is perhaps implementing more automated tests to enhance the reliability of the code.
    
    Zhufeng Qiu: This team project is a rare experience that gave me a taste of the industrial experience in advance. Working with people is always fun and challenging, and it requires not only programming skills, but also project management skills. One of the things I learned was the ability to quick learn and solve things. Since there were a lot of new features in this project that I wasn't familiar with, it required me to learn and deploy quickly, which was very challenging. What I need to change is setting time milestones which is very important for the completion of the project, so that we can complete our respective tasks at each milestone and keep project moving on.

    Guanhong Jiang: This has been a wonderful experience. Although I struggled personally, I did learn a lot from this project. My teammates are patient and knowledgeable and they answered many questions from me. One key learning I took away from this experience is that I should start early and give myself time to watch tutorials. Because throughout this project, I stuck on different topics and I needed time to learn to overcome those challenges. I also learned about the process of implementing a planned user interface using code. One thing I would do differently is that before we start working on different pages, I would speak with my teammates to standardize our design to make writing css in the later stage easier. I learned about branching in github through this project as well.


4. Explain how your project authenticates your users.
    
    In this project, Google OAuth2.0 is used to authenticated users. With the help of Google OAuth2.0 module and passport middleware, we can link to Google Email Login Page easily. After login successfully, the website will redirect to the home page. The difficulty is its brand-new thing to our team, so the configuration and the setting is really hard, but we are happy that we have finished it!

5. What was the process like for working on a team repository?

   Coordinating with team, we established a clear project structure and branching strategy. Encouraging regular pull requests, maintaining consistent coding standards, and communicating effectively helps minimize conflicts. Merging changes early and often, conducting thorough code reviews, and prioritizing testing are crucial for seamless collaboration on our web project.