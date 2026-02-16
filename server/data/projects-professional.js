import { Tag, openLinkInNewTab, Component, getDocument } from '../misc/utils.js'

export default [
  Tag('h1', 'Professional Projects'),

  Component('UpdatedOn', { date: 'February 15, 2026' }),

  Tag('h2', 'Code Climate'),
  Tag(
    'p',
    `In 2025, I worked as a Full-Stack Product Engineer at Code Climate, a company building an engineering intelligence platform for enterprise organizations. The product ingested data from developer tools - GitHub, GitLab, Jira, Bitbucket, and others - to surface engineering metrics that helped managers understand team performance, identify bottlenecks, and make data-driven decisions. Our largest clients had over 5,000 engineers and millions of pull requests flowing through our system, so everything we built had to work at scale.`
  ),
  Tag(
    'p',
    `What made this role unique was that I joined during a major platform modernization effort. The company was rebuilding its core product from the ground up with a modern stack - React, TypeScript, Remix for server-side rendering, and ClickHouse for analytics queries. This was true 0-to-1 work: we weren't incrementally improving an existing product, we were re-architecting it to handle enterprise-scale data while shipping features fast enough to retain customers during the transition. Over my time there, I became one of the most active contributors to the codebase, owning multiple major features end-to-end from design through production deployment.`
  ),

  Tag('h3', 'Metrics Explorer V2'),
  Tag(
    'p',
    `Before V2, customers could only view one metric at a time in a basic line chart - useful for simple questions, but frustrating when they wanted to correlate multiple metrics or spot trends across different dimensions. Engineering leaders would often export data to Excel just to put two metrics side by side. We built Metrics Explorer V2 to change that: a fully interactive query builder where users could select multiple metrics, group by any dimension, compare against prior periods, and visualize everything in one unified view.`
  ),
  Tag(
    'p',
    `The visualization layer was the most technically complex piece. Since each metric could have different units - cycle time in hours, deployment frequency as a count, code review coverage as a percentage - I had to design a chart system that could intelligently handle mixed units. I built dual Y-axis support using ECharts, with automatic axis assignment based on unit type. Users could also mix chart types within the same view: line charts for trends, bar charts for comparisons, all rendered together coherently.`
  ),
  Tag(
    'p',
    `One challenge I'm particularly proud of solving was color accessibility. With potentially dozens of series on a single chart, I needed to generate distinguishable colors algorithmically without any collisions. I implemented a color palette system using Adobe's color generation principles, ensuring that every series was visually distinct even for users with color vision deficiencies. The chart implementation also included dynamic tooltips, responsive axis labels with intelligent spacing, and smooth transitions when users modified their query - small details that made the difference between a tool people tolerated and one they actually enjoyed using.`
  ),

  Tag('h3', 'Scorecard V2'),
  Tag(
    'p',
    `The Scorecard was one of our flagship features - a hierarchical view of an organization's engineering metrics. Think of it as a data table where rows are people or teams, columns are metrics, and the whole thing is navigable like a file system. You start at the organization root and drill down: click into a department to see its teams, click into a team to see individual engineers. At every level, you see the aggregated metric values for that node and its children.`
  ),
  Tag(
    'p',
    `The V2 rewrite migrated this from client-side rendering to server-side rendering with Remix, which was critical for performance with large organizations. But the bigger technical challenge was the data layer. Each organization could configure which metrics appeared as columns, and each metric required its own API call. For a scorecard with five metrics and fifty visible rows, that could mean hundreds of individual requests. I implemented request batching that reduced API calls by roughly two-thirds, grouping metrics intelligently and parallelizing where possible.`
  ),
  Tag(
    'p',
    `I also rebuilt the navigation experience to feel instantaneous. When a user clicks into a node, they see a skeleton loading state immediately while the new data loads - a small UX detail that made hierarchical exploration feel responsive even when the backend was doing heavy lifting. The breadcrumb system I implemented let users understand where they were in the hierarchy and jump directly to any ancestor node, which was especially important for organizations with deep team structures.`
  ),

  Tag('h3', 'Admin Portal Migration'),
  Tag(
    'p',
    `When I joined, customer administrators had to switch between two separate applications to manage their account - the main analytics app for viewing data, and a legacy Portal for configuration. Customers had been asking for a unified experience, so I led the migration of four major admin pages into the main application: the Issues page for viewing data ingestion problems, the Usage Data page for tracking API consumption, the Data Uploads page for manual data imports, and the Source Events page for monitoring integration health.`
  ),
  Tag(
    'p',
    `Each page had its own complexity. The Data Uploads page integrated with Dromo, a third-party data import widget, and required defining validation schemas for HR data. The Issues page needed a system for mapping cryptic API errors to human-readable explanations - I built a JSON-based mapping system covering eight different integrations, with dynamic markdown loading for contextual help documentation. The Usage Data page required implementing file download functionality with proper streaming and progress indicators.`
  ),
  Tag(
    'p',
    `Beyond just porting functionality, I added redundant permission checks to every admin route - a defense-in-depth approach that became important for our enterprise clients with strict security requirements. I also built real-time domain validation for the source configuration flow, giving users immediate feedback if they mistyped a URL rather than letting them submit and fail.`
  ),

  Tag('h3', 'Testing Infrastructure'),
  Tag(
    'p',
    `When I arrived, the codebase had almost no end-to-end testing - just scattered unit tests that didn't cover actual user workflows. I established the E2E testing infrastructure using Playwright, eventually reaching 80-90% coverage of major features. The test suite included comprehensive coverage for Metrics Explorer, Scorecard, the admin pages I migrated, and the core application flows.`
  ),
  Tag(
    'p',
    `What made this work particularly interesting was my approach to AI-assisted development. Rather than writing every test by hand, I developed a systematic workflow: I'd write a detailed markdown specification explaining the feature to test, relevant file paths, testing methodology, and specific edge cases. I'd then submit this to an AI tool to generate the initial test code asynchronously. Once complete, I'd review thoroughly - not just checking that tests passed, but understanding every assertion and ensuring the coverage actually validated what mattered. I'd run the tests in a real browser, iterate on failures, and refine my specifications based on what worked.`
  ),
  Tag(
    'p',
    `I documented this entire process in a markdown guide that I refined over time, creating a feedback loop that made each subsequent test suite faster to produce. This wasn't about using AI as a crutch - it was about recognizing that test writing is often mechanical once you know what to test, and redirecting my time toward the harder problem of defining comprehensive test strategies. The tests now run in GitHub Actions on every PR, taking about 10 minutes with parallel workers, and have caught regressions before they ever reached production.`
  ),

  Tag('h3', 'Production Ownership'),
  Tag(
    'p',
    `Being at a startup meant everyone owned production, not just whoever was officially on-call. We used Sentry for error monitoring, and the whole team kept an eye on the error feed - especially after deploying new features. I regularly picked up frontend issues as they surfaced: hydration mismatches from timezone differences between server and client, chart rendering edge cases, SSR performance problems with our date picker component. None of these were glamorous fixes, but catching and resolving them quickly was part of maintaining the trust our enterprise clients placed in us.`
  ),
  Tag(
    'p',
    `I also contributed to security remediation work when we went through SOC-2 compliance. This involved patching several high-severity vulnerabilities flagged by Vanta - issues in dependencies like js-yaml, jws, and node-forge that could have exposed us to code execution or signature bypass attacks. The work itself was mostly dependency updates, but doing it under audit deadlines with production systems running taught me how compliance intersects with real engineering work.`
  ),

  Tag('h3', 'Reflections'),
  Tag(
    'p',
    `Code Climate reinforced what I'd learned at previous startups: the value of owning outcomes, not just tasks. When you're building for enterprise customers with thousands of engineers depending on your data, "it works on my machine" isn't good enough. You have to think about scale, edge cases, and the downstream impact of every decision. At the same time, the pace was relentless - we deployed to production on every merge to main, which meant shipping with confidence and fixing quickly when things broke.`
  ),
  Tag(
    'p',
    `I'm also proud of how I approached AI-assisted development here. Rather than treating AI as either a magic solution or something to avoid, I found a middle ground: using it to accelerate the mechanical parts of my work while staying deeply engaged with the output. The testing infrastructure I built is a direct result of that philosophy - I couldn't have written 500+ lines of E2E tests across four admin pages in a reasonable timeframe without AI assistance, but every test reflects decisions I made about what to validate and why.`
  ),
  Tag('a', 'Code Climate homepage', {
    href: 'https://codeclimate.com/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/professional/code-climate/code-climate-cover.jpeg',
    mediaProps: { alt: 'Code Climate Logo' },
  }),

  Tag('h2', 'CyberConvoy'),
  Tag(
    'p',
    `Throughout 2024, I worked as a Full-Stack Engineer at CyberConvoy, an early-stage cybersecurity startup. The company had two main departments: security analysts who provided managed security services, and engineers who built the platform. Most of what we built was for our own analysts to use - threat hunting tools, case management, alerting systems - but we also offered the platform directly to clients with limited permissions so they could stay up to date on their security posture in real time.`
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
    `I also built several systems the rest of the platform relied on: real-time notifications using Socket.IO so analysts didn't miss time-sensitive alerts, a whitelist management system with expiration dates to reduce false positive fatigue, and Auth0 RBAC integration with multi-tier roles for analysts, engineers, and clients. Each addressed a specific pain point that was slowing down the team or creating security gaps.`
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
    `From mid-2022 through early 2025, I was the Founding Engineer at LISDIN (Life Is Short, Do It Now), a small startup building a platform for idea validation and team formation. The goal was to give aspiring founders a single workspace to develop their idea, validate their market with AI-generated analysis, recruit collaborators, and manage their team — instead of scattering all of that across docs, spreadsheets, and browser tabs. I was the primary engineer by far, owning over 90% of the codebase across a React/TypeScript/Vite frontend and Node.js/Express/MongoDB backend, with 260+ commits over the life of the project.`
  ),

  Tag('h3', 'The Idea Dashboard'),
  Tag(
    'p',
    `The core of the product was a tabbed dashboard where founders could flesh out every dimension of their idea in one place: product description, team management, traction metrics, AI-generated market trends, AI-generated pitch deck, and strategic pivots. The most interesting technical problem here was autosave. With dozens of input fields spread across six tabs, I needed to persist changes transparently without hammering the API on every keystroke. I built an AutoSave component that tracked modified fields using a keychain pattern — an array of keys representing the path to any nested value in the idea object, like ['team', 'members', 0, 'specialty']. Changes were collected and dispatched through a lodash debounce with a two-second delay, sending only the modified fields via PATCH. Redux Toolkit handled the immediate UI updates in two slices (session data and user data), so the interface stayed responsive while the network calls were batched behind the scenes.`
  ),

  Tag('h3', 'AI-Powered Market Intelligence'),
  Tag(
    'p',
    `I integrated OpenAI's GPT-4o (after migrating from an initial Google Gemini integration) to power three features. Industry Trends generation produced a structured market analysis — market size, audience, growth projections over multiple horizons, current trends, and a competitive landscape with market share breakdowns. I engineered the prompts to enforce strict JSON output, then parsed and rendered the data as interactive charts (pie charts for competitors, line charts for growth) using MUI X-Charts. To avoid redundant API calls, I cached results in a dedicated MongoDB collection with a compound index and 90-day TTL. The Pitch Deck and Pivot features took the user's full idea payload and generated structured markdown outputs — an investor narrative and a set of strategic variations, respectively — both persisted in the idea document so nothing was lost between sessions.`
  ),

  Tag('h3', 'Collaboration & Discovery'),
  Tag(
    'p',
    `I built a full collaboration pipeline around the ideas. The Browse page let users discover public ideas with industry filtering (URL-persisted for shareable links), trending/recency sorting, and upvoting. From there, users could submit join requests that idea owners would accept or deny from their Team tab. I implemented a privacy layer where the API returned different MongoDB projections based on the requester's role — owners saw everything, members saw idea details minus join requests, and public viewers only got minimal metadata for private ideas. I also built threaded discussions organized around structured prompts (impacts, limitations, opportunities), each with their own comment threads, upvoting/downvoting, and sorting.`
  ),

  Tag('h3', 'Reflections'),
  Tag(
    'p',
    `LISDIN was my first experience as a founding engineer, and it shaped how I approach building products. When you're the only engineer, every decision — TypeScript or JavaScript, custom auth or managed service, denormalized data or normalized — is yours to make and live with. I also migrated the entire codebase to TypeScript, set up the full code quality pipeline (publishing a shared ESLint config as an npm package), and moved from Create React App to Vite. This was where I first integrated generative AI into a product, and the prompt engineering and caching patterns I built here directly informed the AI work I did later at CyberConvoy. More than anything, it taught me that I work best when I own the full picture end to end.`
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
