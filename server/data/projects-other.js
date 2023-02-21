import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'

export default [
  Tag('h1', 'Other Work Experience'),

  Component('UpdatedOn', { date: 'February 21, 2023' }),

  Tag('h2', 'Stevens Institute of Technology'),

  Tag('h3', 'Fall 2022'),
  Tag(
    'p',
    `For my last semester as a Course Assistant at Stevens, I got to be with perhaps my favorite class at Stevens yet: Web Programming I. Here, I tutored students in course topics such as JavaScript, Express, MongoDB, and much more. At the end, I also thoroughly graded final projects with a penetration-testing mindset.`
  ),
  Tag('a', 'CS 546 Course Syllabus', {
    href: 'https://web.stevens.edu/academic_files/courses/syllabus/CS546syl.pdf',
    ...openLinkInNewTab,
  }),
  Component('Link', {
    label: 'My work in CS 546',
    to: '/projects/personal#web-programming-i-final-project:-mediahub',
  }),

  Tag('h3', 'Spring 2021'),
  Tag(
    'p',
    `During this semester, I worked as a Course Assistant for the Systems Programming class at Stevens. I tutored students in course topics such as system calls, concurrent programming, and sockets, while also helping them in understanding Bash and C. Plus, I assessed students with exams written by the professor and self-designed lab assignments.`
  ),
  Tag('a', 'CS 392 Course Syllabus', {
    href: 'https://web.stevens.edu/academic_files/courses/syllabus/CS392syl.pdf',
    ...openLinkInNewTab,
  }),

  Tag('h3', 'Fall 2021'),
  Tag(
    'p',
    `For my first semester as a Course Assistant, I was part of the Introduction to Computer Science class at Stevens. I tutored students in course topics such as recursion, memoization, and dynamic programming. Additionally, I conducted labs to train students on topics covered in lecture with Python.`
  ),
  Tag('a', 'CS 115 Course Syllabus', {
    href: 'https://web.stevens.edu/academic_files/courses/syllabus/CS115syl.pdf',
    ...openLinkInNewTab,
  }),

  Component('Media', {
    Type: 'img',
    src: '/projects/other/stevens-logo.png',
    mediaProps: { alt: 'Stevens Logo' },
  }),

  Tag('h2', 'International Ivy'),
  Tag(
    'p',
    `Following my high school graduation, I worked as an instructor at International Ivy's educational summer camp. There, I taught a basic cryptography course to elementary and middle school students. The course, taught using Python, introduced students to fundamental ciphers such as the Caesar, Affine, and Vigenère Ciphers. I further contributed by customizing lesson plans to help students learn more effectively.`
  ),
  Tag('a', 'International Ivy homepage', {
    href: 'http://www.iisummer.com/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/other/international-ivy-logo.jpg',
    mediaProps: { alt: 'International Ivy Logo' },
  }),

  Tag('h2', 'Mathnasium'),
  Tag(
    'p',
    `During my senior year of high school, I worked at my local Mathnasium franchise, a company that helps students in grades K-12 understand and learn math. I teach everything from basic arithmetic to introductory calculus.`
  ),
  Tag('a', 'Mathnasium of Northeast Parsippany homepage', {
    href: 'https://www.mathnasium.com/neparsippany',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    src: '/projects/other/mathnasium-indoor.jpg',
    mediaProps: { alt: 'Mathnasium Parsippany Interior' },
  }),

  Tag('h2', 'Boy Scouts of America'),
  Tag(
    'p',
    `My first job, at the age of 14, was a volunteer camp counselor for the Boy Scouts' Summer STEM Institute (SSI). The following year, I worked for SSI as a paid counselor. My role was to help boys and girls in grades 1 through 6 learn about the different aspects of the STEM subjects.`
  ),
  Tag('a', 'SSI Facebook Page', {
    href: 'https://www.facebook.com/SummerSTEMInstitute/',
    ...openLinkInNewTab,
  }),
  Component('Media', {
    Type: 'img',
    caption: 'Helping students build a kit kart',
    src: '/projects/other/bsa-kart-activity.jpg',
    mediaProps: { alt: 'BSA Kart Activity' },
  }),
]
