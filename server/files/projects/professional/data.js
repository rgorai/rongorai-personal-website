import {
  getFile,
  Tag,
  openLinkInNewTab,
  Component,
} from '../../../misc/utils.js'

export default [
  Tag('h1', 'Professional Projects'),

  Tag('h2', 'NeuraFlash'),
  Tag(
    'p',
    `I am currently working at NeuraFlash as a Software Developer Co-op on projects involving Salesforce, natural language processing, and artificial intelligence / machine learning.`
  ),
  Component('Media', {
    Type: 'img',
    src: getFile('projects/professional/neuraflash/neuraflash-logo.png'),
    mediaProps: { alt: 'NeuraFlash Logo' },
  }),

  Tag('h2', 'IBM'),
  Tag(
    'p',
    `In the summer of 2021, I worked at IBM as a Front-End Developer Co-op in their Cloud and Cognitive department for my third co-op. The project I was working on is a web application for IBM's Db2 database migration service. In short, the migration service is a tool to migrate data between Db2 databases. The web application provides a GUI for this service to allow users to easily create a migration service, choose the data they want to migrate, run the migration, and manage multiple migration services.`
  ),
  Tag(
    'p',
    `When I joined the team at the end of spring, they were close to wrapping up the first beta release of the application. This meant that all of the major tasks were already being taken care of, so I was tasked with researching different React testing platforms (Jest, Puppeteer, Cypress) and deciding what would be best to use for our project. After presenting my findings to the team, I suggested we use Cypress because it offers multiple forms of testing, a GUI to easily view and run tests, support for multiple browsers, and test execution in both headless and headful browser modes. They agreed to move forward with Cypress, but put that part of the project aside for now. By this point, the rest of the team were starting to finish and push what they were working on, so there were a handful of gaps to fill and pieces to connect.`
  ),
  Tag(
    'p',
    `The first component I had to build was a container that would allow users to view the info about their newly-created migration job in the same flow and format as they had created it. At first, based on the file structure of the server, I decided to just copy the code for the creation flow and modify it to fit the spec and design of the view flow. However, I soon realized that it would be easier and more efficient to modify the creation flow code to take in an additional parameter instead; this boolean parameter would indicate if you wanted to use the component as a creation flow or a view flow, and the structure/styles would change appropriately based on its value. This way, it would also be a lot easier to manage the data that goes in and out of the component. Furthermore, to create the subcomponents in the view flow, I used IBM's Carbon Design System. It is essentially a large collection IBM-themed components, making it mucheasier to keep the aesthetics of the whole application consistent within itself as well as other IBM products.`
  ),
  Tag(
    'p',
    `While creating this component, I had to ensure it worked in every aspect; this meant testing numerous payloads of data that would behave as expected. To do this, I first started with creating dummy data in the same format that the creation flow would create, making it trivial to put the data back into the view flow since they are essentially the same component. This was very efficient during the development of the view flow, since I could run everything on the frontend only. However, when I had completed the UI for the view flow, I had to finally ensure it worked with the data from the backend as well. With the help of some of my teammates, I got our backend server running in a python environment. With both servers running, I was able to connect to them with an API called Swagger. It allowed me to send simulated JSON data with the backend's format, view the response it gets from our server, and view the response from the UI all in real-time. The only complication I had was that the backend's format of the migration job data differed rather drastically from the frontend's format, I wrote a simple function that reads the data from the backend and parses it into the frontend's format.`
  ),
  Tag(
    'p',
    `After completing the view flow, I was sort of in between tasks. I used this time to pick up some small issues in our GitHub tracker. Additionally, due to my keen attention detail, I addressed any styling/UX issues I noticed.`
  ),
  Tag(
    'p',
    `As the date of the beta release grew closer, there were more and more bugs to fix, but also more and more pieces of the application coming together. Once fully functional features were completed, I set up the Cypress environment for our frontend and started writing some integration and e2e tests for them. Once I completed a handful of tests that encompassed the main features, the team gave me one last task before the summer ended - to create a Travis CI build for the repo that will automatically run some of the Cypress tests when pushing code to GitHub. Even though I hadn't had experience with Travis or even YAML before this, it was relatively easy to pick up and find out how to integrate Cypress into the pipeline.`
  ),
  Tag('a', 'More on IBM Db2 Migration Service', {
    href: 'https://www.ibm.com/docs/en/db2/11.5?topic=db2-migration-service',
    ...openLinkInNewTab,
  }),
  Tag('a', 'My research on testing platforms', {
    href: getFile('projects/professional/ibm/testing-pros-cons.pdf'),
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: getFile('projects/professional/ibm/ibm-office.png'),
    mediaProps: { alt: 'IBM Office' },
  }),

  Tag('h2', 'ZAIS Group'),
  Tag(
    'p',
    `During the spring of 2020, I participated in my first co-op. I was working as a Technology and Analytics Co-op for ZAIS Group, a financial services company specialized in credit investment and management. I worked alongside my Stevens classmates Lucas Berard and Mohammad Khan. I returned for another co-op term in the fall of 2020, and am currently working there part-time in the spring of 2021.`
  ),
  Tag('a', "ZAIS Group's Website", {
    href: 'https://www.zaisgroup.com',
    ...openLinkInNewTab,
  }),

  Tag('h3', 'Spring 2021'),
  Tag(
    'p',
    `Since I am taking classes alongside my work at ZAIS, I had to spend less time working on our web application. I continued working on styling and design. Most recently, I learned how to use Cypress JS to create and perform user integration tests.`
  ),

  Tag('h3', 'Fall 2020'),
  Tag(
    'p',
    `This time around, I worked on a different project than the other co-ops. The technology team was working on a web application that would aid the company's president (and in the future, clients) in viewing and managing the company's loan and asset data. The back-end of the application was developed with JavaScript and Node, and the frontend was developed with React; I was assigned to the frontend. Being of an artistic background, I really enjoyed combining my software skills with my creative traits such as attention to detail and design sense. As the semester went on, I grew very familiar with the perks of React and how it meshes together with other languages like HTML and CSS to make up a web application.`
  ),

  Tag('h3', 'Spring 2020'),
  Tag(
    'p',
    `Our primary task throughout the co-op term was to write web scraping Python scripts to obtain companies' ESG data from a list of websites supplied to us by the financial department. Since none of us had experience with scraping at this point, we started out with small tasks, like scraping table of data from Wikipedia with a simple scraping library called Scrapy. During this time we also learned how to use git version control to organize our code in relation to the rest of the project files. We used the Azure DevOps platform and used a pull request system to merge our work. This helped me understand the importance of peer-reviewing code.`
  ),
  Tag(
    'p',
    `As we quickly grew familiar with scraping concepts and methodologies, we proceeded to use Beautiful Soup to scrape the easier / lower priority websites from the list we were given. Before long, we were using Selenium to navigate through high priority websites and download large quantities of data and files. We used Microsoft Azure Data Lake to store the data we scraped.`
  ),
  Tag(
    'p',
    `Once we were nearing the end of the list, we needed to develop a way automate the running of the scripts and uploading of the scraped data so the financial team has access to updated data in the future. To accomplish this, we used Docker to automate the scripts and Microsoft Azure functions to upload the data to the data lake.`
  ),
  Tag('a', 'My Spring 2020 ZAIS Project Report', {
    href: getFile('projects/professional/zais/spring-2020-report.pdf'),
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: getFile('projects/professional/zais/zais-office.jpg'),
    mediaProps: { alt: 'ZAIS Group Office' },
  }),

  Tag('h2', 'KOVID Analytics'),
  Tag(
    'p',
    `During the summer of 2017, I worked as a cyber-analytics intern at Kovid, Inc. The goal of my project was to detect suspicious online activity on the NEICE servers. NEICE (the National Electronic Interstate Compact Enterprise) is a cloud-based system managed by the Interstate Compact on the Placement of Children (ICPC) to place children across state borders.`
  ),
  Tag(
    'p',
    `The project involved building modules for automatic (machine) detection and manual (human) detection of suspicious activity.`
  ),
  Tag('a', 'My KOVID Project Report', {
    href: getFile('projects/professional/kovid/project-report.pdf'),
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        caption: 'Login Times Chart',
        src: getFile('projects/professional/kovid/login-times-chart.jpg'),
        mediaProps: { alt: 'Login Times Chart' },
      },
      {
        Type: 'img',
        caption: 'Login Rates Chart',
        src: getFile('projects/professional/kovid/login-rates-chart.jpg'),
        mediaProps: { alt: 'Login Rates Chart' },
      },
    ],
  }),
]
