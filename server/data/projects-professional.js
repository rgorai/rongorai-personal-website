import { Tag, openLinkInNewTab, Component, getDocument } from '../misc/utils.js'

export default [
  Tag('h1', 'Professional Projects'),

  Component('UpdatedOn', { date: 'February 1, 2026' }),

  Tag('h2', 'CyberConvoy'),
  Tag(
    'p',
    `Throughout 2024, I worked as a full-time Full-Stack Engineer at CyberConvoy, an early-stage cybersecurity startup. The company had two main departments: security analysts who provided managed security services, and engineers who built the platform. Most of what we built was for our own analysts to use - threat hunting tools, case management, alerting systems - but we also offered the platform directly to clients with limited permissions so they could stay up to date on their security posture in real time.`
  ),
  Tag(
    'p',
    `At a high level, the platform was a SIEM - a system for collecting, analyzing, and acting on security data. Each of our clients installed lightweight agent software on their employees' machines, which collected logs about user activity: software installs, websites visited, file access, and so on. All of this telemetry flowed into a central data lake, which analysts could query directly through Investigate. Some of the data was also processed into PostgreSQL via scheduled jobs to power dashboards and case management within the app.`
  ),
  Tag(
    'p',
    `What made this role particularly formative was the scope of ownership I had across the entire product. I wasn't just implementing features from a spec - I was a core architect who built systems from scratch, made foundational technical decisions, and shipped production code across the full stack. Over the course of the year, I became the most active contributor to the codebase, working across every major feature the platform offered.`
  ),
  Tag(
    'p',
    `The core platform was built with React and TypeScript on the frontend, with a Node.js/Express backend connected to PostgreSQL via Prisma. My earliest major contribution was leading the full TypeScript migration of the codebase and setting up ESLint configuration to enforce code quality standards. This was critical for a fast-moving team where multiple engineers were shipping code daily - having strict typing and consistent linting caught countless bugs before they ever made it to production.`
  ),

  Tag('h3', 'Investigate'),
  Tag(
    'p',
    `Before Investigate, our team relied on Snowflake for ad-hoc queries, which was getting expensive as data volumes grew. Analysts also had to context-switch between tools or wait on pre-built reports that rarely answered their specific questions. We built Investigate as a cost-effective alternative using Trino, giving analysts the same query capabilities directly within the platform without the licensing overhead.`
  ),
  Tag(
    'p',
    `The main technical challenge was handling queries that could return millions of rows without overwhelming the server or making the user wait indefinitely. To solve this, I designed a streaming architecture using async generators and HTTP chunked transfer encoding. On the backend, I wrote an async generator function that would yield result chunks as they came back from Trino, and then the Express route would iterate over this generator with a for-await loop, writing each chunk to the response stream. This meant users could see their first results within seconds, even for queries that would ultimately return hundreds of thousands of rows. To handle the frontend rendering of these massive datasets, I implemented row virtualization using TanStack Virtual, so the browser would only render the rows currently visible in the viewport rather than trying to DOM-render the entire result set. Combined with a caching layer that stored result chunks keyed by query ID, analysts could paginate through enormous datasets smoothly - turning what used to be a multi-hour investigation into something they could complete in minutes.`
  ),

  Tag('h3', 'Assist (AI Assistant)'),
  Tag(
    'p',
    `Our clients - generally business stakeholders rather than technical analysts - often wanted quick insights from their security data but didn't have the SQL knowledge to query it directly. We built Assist to bridge that gap: an AI chat feature powered by our in-house model, Armada, that let users describe what they wanted in plain English, like "show me all users with suspicious logins over the last 7 days", and get back a conversational response explaining the approach along with a working SQL query to execute.`
  ),
  Tag(
    'p',
    `The interface offered preset prompts for common questions or let users type their own. Under the hood, our CTO maintained Armada as a self-hosted LLM (we cycled through many public models like Mistral, Claude, and GPT depending on performance) fine-tuned on our schema. We instructed the model to respond in markdown, wrapping any generated SQL in code blocks. On the frontend, I parsed out the SQL using regex, displayed it to the user for transparency, and fired it against our data lake. The UI would then smoothly split - chat on the left, a live data table on the right showing the query results. From there, users could export the data or jump directly into a full investigation.`
  ),
  Tag(
    'p',
    `I worked on the integration end-to-end: the streaming architecture that displayed responses word-by-word using async generators, the markdown parsing, the dynamic split-view UI, and the query execution pipeline. The real-time streaming was important for UX - watching the response appear progressively felt much more responsive than waiting for the full generation. This gave non-technical users a way to self-serve insights that previously would have required asking an analyst to write a query for them.`
  ),

  Tag('h3', 'Scout'),
  Tag(
    'p',
    `Security teams often struggled to maintain visibility into their external attack surface - the domains, subdomains, and hosts that could be exploited by attackers. The data existed across multiple intelligence sources, but each API returned information in wildly different formats with varying levels of detail, making it nearly impossible to get a unified picture without significant manual effort. Scout solved this by aggregating data from five different security intelligence APIs - DNStwist for detecting typosquatting domains, Subfinder for subdomain enumeration, Censys for discovering exposed hosts, Dehashed for finding leaked credentials, and Flare for dark web monitoring - and normalizing everything into a consistent, searchable interface.`
  ),
  Tag(
    'p',
    `Beyond just aggregating data, I built a Leaflet-based map visualization that geolocated discovered hosts, which became one of the most effective features for quickly identifying anomalies. For example, if a company only operates in the United States but Scout suddenly shows hosts appearing in Eastern Europe, that's an immediate red flag worth investigating. This kind of visual pattern recognition would have been nearly impossible when the data was scattered across different tools.`
  ),

  Tag('h3', 'Foundational Systems'),
  Tag(
    'p',
    `I also built several foundational systems that the rest of the platform relied on, each addressing a specific operational pain point.`
  ),
  Tag(
    'p',
    `Security alerts are time-sensitive, but analysts were missing critical notifications because they had to manually refresh the page to see new activity. I implemented a real-time notification infrastructure using Socket.IO that pushed alerts instantly to the browser - whether it was a new threat detection, a case update, or a status change. This reduced response times significantly and ensured that high-priority alerts didn't sit unnoticed while an analyst was focused on something else.`
  ),
  Tag(
    'p',
    `Detection rules inevitably generate false positives, and without a proper exception system, analysts waste hours triaging the same benign alerts over and over. I designed and built a whitelist management system that let analysts create exception lists for specific rules, with support for expiration dates so temporary exceptions wouldn't become permanent blind spots. This reduced alert fatigue and let the team focus their attention on genuine threats rather than known false positives.`
  ),
  Tag(
    'p',
    `I also implemented Auth0 RBAC integration with multi-tier roles for analysts, engineers, and junior engineers. Different users needed access to different parts of the platform based on their experience level and clearance - junior analysts shouldn't be able to modify detection rules, for instance, while senior engineers needed full access to system configuration. Getting this right was important for both security and compliance, ensuring people had exactly the permissions they needed without unnecessary friction.`
  ),

  Tag('h3', 'Reflections'),
  Tag(
    'p',
    `Looking back, what I valued most about this role was the 0-to-1 experience. When you're at an early-stage startup, you can't just Google "how to build X" and follow a tutorial - you're often solving problems that don't have clean answers yet. You have to make judgment calls about architecture, trade-offs, and what's worth building now versus later. That kind of ownership and autonomy is hard to find elsewhere, and it fundamentally shaped how I approach engineering problems today.`
  ),
  Tag('a', `CyberConvoy homepage`, {
    href: 'https://www.cyberconvoy.com/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/cyberconvoy/cyberconvoy-logo.webp',
    mediaProps: { alt: 'CyberConvoy Logo' },
  }),

  Tag('h2', 'LISDIN'),
  Tag(
    'p',
    `Until about the middle of 2024, I was working part-time as a Founding Engineer for a small startup named LISDIN, which is short for our motto: Life Is Short, Do It Now. While their website is currently a simple blog for sharing ideas, we are working on building “a new platform that cultivates all ideas to accelerate innovation”. Here, users will be able to create and share their own project ideas, research market interest, calculate potential value, and more.`
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
    `For my final co-op term at Stevens, I was a Software Developer at NeuraFlash. In order to get accustomed to their work culture and technical practices, I was tasked with improving an internal tool for my first project, called the UI Enhancer Payload Generator. This tool is a React application that was built to assist our Einstein Bot - one of the main products of NeuraFlash - developers in building enhanced UI for the bot's chat box. It supported a small handful of our custom Lightning Web Components (LWCs), such as a MiniCard, a simple card with a title, image, and description, or a FormCard, a component that allowed our bot builders to create any arbitrary form for users of a chat bot. The UI Enhancer served as a platform for builders to input the UI data (or payload) in a user-friendly manner, compared to the conventional method of typing out the data in JSON manually into a basic textbox on a SalesForce dashboard.`
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
    `In the summer of 2021, I worked at IBM as a Front-End Developer in their Cloud and Cognitive department for my third co-op. The project I was working on was a web application for IBM's Db2 database migration service. In short, the migration service is a tool to migrate data between Db2 databases. The web application provides a GUI for this service to allow users to easily create a migration service, choose the data they want to migrate, run the migration, and manage multiple migration services.`
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
    `While creating the view flow component, I had to ensure it worked in every aspect - this meant testing numerous payloads of data. To do this, I first started by creating dummy data in the same format as the creation flow's output. This was very efficient for me during the development of the view flow, since I only needed to run the frontend. However, when I had completed the UI, I had to ensure the component worked with the real data from the backend as well. With the help of some of my teammates, I got our backend server running in a python environment on my machine. to test different payloads with the server, I used an API platform called Swagger (which is basically Postman). The only complication I had was that the backend's migration job data structure differed rather drastically from the frontend's, so I wrote a simple function that reads the data from the backend and parses it into the frontend's format.`
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
    `During the spring of 2020, I participated in my first co-op. I was working as a Technology and Analytics Engineer for ZAIS Group, a financial services company specialized in credit investment and asset management. I worked alongside some of my Stevens classmates, Lucas Berard and Mohammad Khan. I returned for another co-op in Fall 2020, and a part-time position in Spring 2021.`
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
    `This time around, I worked on a different project than the other co-ops. The technology team was working on a web application that would aid the company's president (and perhaps even clients in the future) in viewing and managing the company's loan and asset data. The backend of the application was developed with JavaScript and Node.js, and the frontend was developed with React; I was assigned to the frontend. Being of an artistic background, I really enjoyed combining my software skills with my creative traits such as attention to detail and design sense. As the semester went on, I grew very familiar with the perks of React and how it meshes together with other languages like HTML and CSS to make up a web application.`
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
