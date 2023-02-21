import { Tag, Component, openLinkInNewTab, getDocument } from '../misc/utils.js'

export default [
  Tag('h1', 'Personal Projects'),

  Component('UpdatedOn', { date: 'February 20, 2023' }),

  Tag('h2', 'Personal Website'),
  Tag(
    'p',
    `The purpose of this website is to share my hobby and work experiences, as well as showcase my professional skills as a software developer. I created this website from nothing but an empty folder and the knowledge I've gained from my classes and co-ops. It is a web application built on the MERN stack (MongoDB, Express, React, and Node), utilizing modern programming technologies like TypeScript and Sass.`
  ),
  Component('Link', {
    label: 'More about this website',
    to: '/about/this-website',
  }),

  Tag('h2', 'Web Programming II Final Project: TitansChat'),
  Tag(
    'p',
    `For the final project of my Web Programming II class, my group mates and I created TitansChat, a real-time chat application. Building off of what we learned in Web Programming I, we used both classroom-learned technologies (Socket.io, React, TypeScript, Context API, Bootstrap, Sass) and researched ones (AWS S3, Heroku, JWT). Since I’d already had project experience with a large majority of these technologies, I took the initial responsibility of setting it up and building a skeleton repository in a manner that would be easy for my group to use. Additionally, while my group mates felt uncomfortable with the idea of implementing TypeScript given our timeframe, I assured them that in my opinion/experience, overcoming this steep but very quick learning curve would not only make it a lot easier to complete this project, but will also help them in their careers in the future should they pursue web development. Hence, I gladly provided them prompt support in this regard and the project as a whole when they needed it, and in the end they seemed happy to have done things the way we did.`
  ),
  Tag('a', 'TitansChat Repository', {
    href: 'https://github.com/matttarantino/TitanChat',
    ...openLinkInNewTab,
  }),
  Tag('a', 'TitansChat Proposal', {
    href: getDocument('/projects/personal/titanschat-proposal.pdf'),
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'video',
    caption: 'TitansChat demo',
    src: '/projects/personal/titanschat-demo.mp4',
  }),

  Tag('h2', 'Web Programming I Final Project: MediaHub'),
  Tag(
    'p',
    `My final project for Web Programming I was not only a fantastic learning and leadership experience, but was also the main inspiration for me to build this website. The premise of this project, dubbed <i>MediaHub</i>, was to provide users with a single location to search a catalog of movies and TV shows to view/search existing movies/shows, provide opinions through ratings and comments, find streaming platforms on which the movie/show is available, create watchlists of movies/shows to watch, and much more.`
  ),
  Tag('a', 'MediaHub Repository', {
    href: 'https://github.com/rgorai/cs546-final-project',
    ...openLinkInNewTab,
  }),
  Tag(
    'p',
    `In CS 546 Web Programming I, we are taught how to build a basic web application with a MongoDB database, Express backend, and Handlebars frontend. After working with JavaScript for the majority of my professional career so far, learning these technologies was both straightforward and enjoyable. So, when it came time to piece these skills together into a single, full-stack project for our final, I felt that it wasn't enough to just use what we had learned in the class. Due to my passion for web development and my previous professional experience, I decided that I wanted to take the extra step for this project and use React as the frontend framework instead of Handlebars.`
  ),
  Tag(
    'p',
    `In addition to being able to build a more complex and functional application, the main reason I wanted to use React over Handlebars was for the learning experience it would provide to me and my groupmates, graduate students Shweta Naik, Jaiganesh Rao, and Sushant Bhat. One caveat of this plan, however, was that my groupmates hadn't had any experience with React and were unsure if they wanted to move forward with it. To convey why it would be a better idea to try React for our project, I helped them understand how React works and what gaps it fills that Handlebars cannot. In the end, they saw the value of learning React for the project and decided to join me in taking the extra step.`
  ),
  Tag(
    'p',
    `During the process of developing our project, I gained a lot of experience with project management. Since I had professional experience with React and SDLC from my co-ops, my groupmates looked to me for overall guidance. After a couple meetings, we were able to determine each of our interests and strengths; accordingly, I divided the tasks between us. In the end, everyone was able to complete their work remarkably and the project was an overall success.`
  ),
  Tag('a', 'MediaHub Proposal', {
    href: getDocument('/projects/personal/mediahub-proposal.pdf'),
    ...openLinkInNewTab,
  }),
  Tag('a', 'MediaHub Pitch Slides', {
    href: getDocument('/projects/personal/mediahub-pitch-slides.pdf'),
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'video',
    caption: 'MediaHub demo',
    src: '/projects/personal/mediahub-demo.mp4',
  }),
]
