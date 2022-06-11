import { Tag, openLinkInNewTab, Component, getDocument } from '../misc/utils.js'

export default [
  Tag('h1', 'Professional Projects'),

  Tag('h2', 'NeuraFlash'),
  Tag(
    'p',
    `I am currently working at NeuraFlash as a Software Developer Co-op on projects involving React, Apex, and Lightning Web Components.`
  ),
  Tag('a', `Neuraflash homepage`, {
    href: 'https://www.neuraflash.com/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/neuraflash/neuraflash-logo.jpg',
    mediaProps: { alt: 'NeuraFlash Logo' },
  }),

  Tag('h2', 'IBM'),
  Tag(
    'p',
    `In the summer of 2021, I worked at IBM as a Frontend Developer Co-op in their Cloud and Cognitive department for my third co-op. The project I was working on was a web application for IBM's Db2 database migration service. In short, the migration service is a tool to migrate data between Db2 databases. The web application provides a GUI for this service to allow users to easily create a migration service, choose the data they want to migrate, run the migration, and manage multiple migration services.`
  ),
  Tag('a', 'More on IBM Db2 Migration Service', {
    href: 'https://www.ibm.com/docs/en/db2/11.5?topic=db2-migration-service',
    ...openLinkInNewTab,
  }),
  Tag(
    'p',
    `When I joined the team at the end of spring, they were close to wrapping up the first beta release of their application. This meant that all of the major tasks were already being taken care of, so I was tasked with researching different React testing frameworks and deciding which would be the best to use for our project. After presenting my findings to the team, I suggested we use Cypress because it offers multiple forms of testing, a GUI to easily view and run tests, support for multiple browsers, and test execution in both headless and headful browser modes. They agreed to move forward with Cypress, but put that part of the project aside for the time being. By this point, the rest of the team were starting to finish and push what they were working on, so there were a handful of gaps to fill and pieces to connect.`
  ),
  Tag(
    'p',
    `The first component I had to build was one that would allow users to view the details of their existing migration jobs in the same flow/format as when they had created it. At first, based on the file structure of the project, I decided to just copy the code for the creation flow and modify it to fit the specification and design of the view flow. However, I soon realized that it would be easier and more efficient to modify the creation flow code to accept an additional parameter instead. This boolean parameter would indicate if you wanted to use the component to create or view a migration job, with the structure/styles changing appropriately. This way, it would also be a lot easier to manage the data that goes in and out of the component. Furthermore, to create the subcomponents in the view flow, I used IBM's Carbon Design System. It is essentially a large collection IBM-themed components, making it much easier to keep the aesthetics of the whole application consistent within itself and other IBM products.`
  ),
  Tag(
    'p',
    `While creating the view flow component, I had to ensure it worked in every aspect - this meant testing numerous payloads of data. To do this, I first started by creating dummy data in the same format as the creation flow's output. This was very efficient for me during the development of the view flow, since I only needed to run the frontend. However, when I had completed the UI, I had to ensure the component worked with the real data from the backend as well. With the help of some of my teammates, I got our backend server running in a python environment on my machine. to test different payloads with the server, I used an API endpoint called Swagger (which is basically Postman). The only complication I had was that the backend's migration job data structure differed rather drastically from the frontend's, so I wrote a simple function that reads the data from the backend and parses it into the frontend's format.`
  ),
  Tag(
    'p',
    `After completing the view flow, I was sort of in between tasks. I used this time to pick up some small issues in our GitHub tracker. Additionally, due to my keen attention detail, I addressed any styling/UX issues I noticed.`
  ),
  Tag(
    'p',
    `As the beta release grew closer, there were more and more bugs to fix, but also more and more pieces of the application coming together that were a little rough around the edges. Once some of the fully functional features were merged, I set up the Cypress environment for our frontend and started writing some integration and e2e tests for them. Once I completed a handful of tests that encompassed the main features, the team gave me one last task before the summer ended - to create a Travis CI build for the repo that will automatically certain Cypress tests when pushing code to GitHub. Even though I hadn't had experience with Travis or even YAML before this, it was relatively easy to pick up and find out how to integrate Cypress into the pipeline.`
  ),
  Tag('a', 'My research on testing platforms', {
    href: getDocument('/projects/professional/ibm/testing-pros-cons.pdf'),
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/ibm/ibm-office.png',
    mediaProps: { alt: 'IBM Office' },
  }),

  Tag('h2', 'ZAIS Group'),
  Tag(
    'p',
    `During the spring of 2020, I participated in my first co-op. I was working as a Technology and Analytics Co-op for ZAIS Group, a financial services company specialized in credit investment and asset management. I worked alongside some of my Stevens classmates, Lucas Berard and Mohammad Khan. I returned for another co-op in Fall 2020, and a part-time position in Spring 2021.`
  ),
  Tag('a', 'ZAIS Group homepage', {
    href: 'https://www.zaisgroup.com',
    ...openLinkInNewTab,
  }),

  Tag('h3', 'Spring 2021'),
  Tag(
    'p',
    `Since I was taking classes alongside my work at ZAIS this semester, I had to spend less time working on our web application. I continued working on styling and design on our project. Towards the end, I learned how to use Cypress JS to create and perform integration tests.`
  ),

  Tag('h3', 'Fall 2020'),
  Tag(
    'p',
    `This time around, I worked on a different project than the other co-ops. The technology team was working on a web application that would aid the company's president (and perhaps even clients in the future) in viewing and managing the company's loan and asset data. The backend of the application was developed with JavaScript and Node, and the frontend was developed with React; I was assigned to the frontend. Being of an artistic background, I really enjoyed combining my software skills with my creative traits such as attention to detail and design sense. As the semester went on, I grew very familiar with the perks of React and how it meshes together with other languages like HTML and CSS to make up a web application.`
  ),

  Tag('h3', 'Spring 2020'),
  Tag(
    'p',
    `Our primary task throughout this co-op term was writing Python scripts to scrape ESG data from a list of websites supplied to us by the financial department. However, none of us had experience with scraping at this point. So, we started out with small tasks like scraping a table of data from Wikipedia with a simple scraping library called Scrapy. During this time we also learned how to use Git to control and share our code.`
  ),
  Tag(
    'p',
    `As we grew familiar with scraping concepts and methodologies, we proceeded to use Beautiful Soup to scrape the easier and lower priority websites from the list we were given. Before long, we were using Selenium to navigate through high priority websites and download large quantities of data and files, using Microsoft Azure Data Lake to store the data we scraped.`
  ),
  Tag(
    'p',
    `Once we were nearing the end of the list, we needed to develop a way automate the running of the scripts and uploading of the scraped data so the financial team has access to updated data in the future. To accomplish this, we used Docker to automate the scripts and Microsoft Azure functions to upload the data to the data lake.`
  ),
  Tag('a', 'My Spring 2020 ZAIS Project Report', {
    href: '/projects/professional/zais/spring-2020-report.pdf',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/zais/zais-office.jpg',
    mediaProps: { alt: 'ZAIS Group Office' },
  }),

  Tag('h2', 'KOVID Analytics'),
  Tag(
    'p',
    `During the summer of 2017, I worked as a cyber-analytics intern at Kovid, Inc. The goal of my project was to detect suspicious online activity on NEICE (National Electronic Interstate Compact Enterprise) servers. NEICE is a cloud-based system managed by the Interstate Compact on the Placement of Children (ICPC) to place children across state borders. The project involved building modules for automatic (machine) detection and manual (human) detection of suspicious activity.`
  ),
  Tag('a', 'My KOVID Project Report', {
    href: '/projects/professional/kovid/project-report.pdf',
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        caption: 'Login Times Chart',
        src: '/projects/professional/kovid/login-times-chart.jpg',
        mediaProps: { alt: 'Login Times Chart' },
      },
      {
        Type: 'img',
        caption: 'Login Rates Chart',
        src: '/projects/professional/kovid/login-rates-chart.jpg',
        mediaProps: { alt: 'Login Rates Chart' },
      },
    ],
  }),
]
