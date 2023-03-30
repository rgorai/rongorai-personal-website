import { Tag, openLinkInNewTab, Component, getDocument } from '../misc/utils.js'

export default [
  Tag('h1', 'Professional Projects'),

  Component('UpdatedOn', { date: 'February 18, 2023' }),

  Tag('h2', 'LISDIN'),
  Tag(
    'p',
    `I am currently working part-time as a Founding Engineer for a small startup named LISDIN, which is short for our motto: Life Is Short, Do It Now. While their website is currently a simple blog for sharing ideas, we are working on building “a new platform that cultivates all ideas to accelerate innovation”. Here, users will be able to create and share their own project ideas, research market interest, calculate potential value, and more.`
  ),
  Tag(
    'p',
    `My role in the company is to establish and build upon the entire codebase required to run our product. Being the start of a potentially enterprise-level infrastructure, I tried to keep scalability and futureproofing in mind when setting things up. The demo version of the app is currently under development using ReactTS, Sass, Redux, Express, JWT, MongoDB, and more. We plan to host on AWS, and perhaps integrate more AWS services for a beta or future release, such as Cognito and S3.`
  ),
  Tag('a', `LISDIN homepage`, {
    href: 'https://www.lisdin.com/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/lisdin/lisdin-logo.jpeg',
    mediaProps: { alt: 'LISDIN Logo' },
    adjustWidth: 70,
  }),

  Tag('h2', 'NeuraFlash'),
  Tag(
    'p',
    `For my final co-op term at Stevens, I was a Software Developer Co-op at NeuraFlash. In order to get accustomed to their work culture and technical practices, I was tasked with improving an internal tool for my first project, called the UI Enhancer Payload Generator. This tool is a React application that was built to assist our Einstein Bot - one of the main products of NeuraFlash - developers in building enhanced UI for the bot's chat box. It supported a small handful of our custom Lightning Web Components (LWCs), such as a MiniCard, a simple card with a title, image, and description, or a FormCard, a component that allowed our bot builders to create any arbitrary form for users of a chat bot. The UI Enhancer served as a platform for builders to input the UI data (or payload) in a user-friendly manner, compared to the conventional method of typing out the data in JSON manually into a basic textbox on a SalesForce dashboard.`
  ),
  Tag(
    'p',
    `The existing application kind of got the job done, but I could see that there was a lot of room for improvement. So, instead of incrementally updating the existing codebase and potentially leaving a number of gaps given my timeframe, I decided I should rebuild the application from the ground up with TypeScript and Sass to both considerably improve the tool, and to deeply practice my project development skills. In addition to utilizing newer technologies for better features and security, I wanted to make the codebase more efficient and easy to work off of for future developers - skills that would be very useful in my career ahead.`
  ),
  Tag(
    'p',
    `Perhaps my favorite of the improvements I made was a complex, yet simple, system I developed for generating a UI for the different LWCs that the tool supported. The existing application was hard-coding all the form data and payload information for specific LWCs. However, since there could be any number of LWCs that we would want to support on the tool, and each with their own set of specifications, I felt that the current structure was inefficient for scaling with the range of LWCs supported. So, I devised an object-based structure for various aspects of the application where different blocks of code would be executed based on information provided in a single object. For example, I created an array of objects that specified the name and other metadata for each of the LWCs that the app would support, which was then read by various other components of the application to generate navigation links, route names, page headings, and more. So, in order to provide support for more LWC components in the future, all you would have to do is add the relevant information to the main object, which brings me to my favorite part of this project.`
  ),
  Tag(
    'p',
    `In order to continue the theme of efficiency in the effort to prevent future developers from needing to spend unnecessary time developing support for future LWCs, I used my object-based generation system to create a recursive React component that generates the form UI for every LWC's payload generator page. This was done with a seed object that resembled the default state of the payload. Then, the React component would recurse through the values in the seed to generate a different form UI element based on the data type encountered - e.g. a text input for string/number values, a checkbox for boolean values, and a recursive operation for object or array values. However, there could of course be more complex data/UI types than simple primitive values, like options for a select input, a textarea instead of a simple text input, or even a code input area. To remedy custom cases like this, I implemented a key system similar to that of MongoDB query selectors, to allow the developer to specify special data in the seed to render special UI components. For example, I implemented a '$useSelectOptions' keyword to specify options for a select input, as well as any associated extra form fields.`
  ),
  Tag(
    'p',
    `Apart from generating UI for the LWC forms, the other part of the UI Enhancer was displaying the properly formatted payload based on the form input so the builders can easily copy and paste it into the Bot Builder. Since the for seeds can have any arbitrary key names, values, and depth, I created simple recursive helper functions to set and retrieve values nested in an object using a keychain, or the series of keys required to access the desired value in the object. With this, I was able to easily display the parsed payload in real-time using React state.`
  ),
  Tag(
    'p',
    `After polishing up the internal tool, I started working on creating some of my own LWCs and Apex classes for one of NeuraFlash's clients. For me, LWC development is reminiscent of Handlebars, and Apex of Java, so it was relatively easy to get into the hang of them. The first component I made was a Breadcrumb for the topic/article navigation, and the second a rating + feedback component.`
  ),
  Tag('a', `NeuraFlash homepage`, {
    href: 'https://www.neuraflash.com/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/neuraflash/neuraflash-logo.jpg',
    mediaProps: { alt: 'NeuraFlash Logo' },
    adjustWidth: 90,
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
