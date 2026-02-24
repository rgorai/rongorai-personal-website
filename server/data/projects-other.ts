import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'
import { HtmlTag, ComponentName, MediaType } from '../types/enums.js'
import type { PageData } from '../types/content.js'

const data: PageData = [
  Tag(HtmlTag.H1, 'Other Work Experience'),

  Component(ComponentName.UpdatedOn, { date: 'February 21, 2023' }),

  Tag(HtmlTag.H2, 'Stevens Institute of Technology'),

  Tag(HtmlTag.H3, 'Fall 2022'),
  Tag(
    HtmlTag.P,
    `For my last semester as a Course Assistant at Stevens, I got to be with perhaps my favorite class at Stevens yet: Web Programming I. Here, I tutored students in course topics such as JavaScript, Express, MongoDB, and much more. At the end, I also thoroughly graded final projects with a penetration-testing mindset.`
  ),
  Tag(HtmlTag.A, 'CS 546 Course Syllabus', {
    href: 'https://web.stevens.edu/academic_files/courses/syllabus/CS546syl.pdf',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.Link, {
    label: 'My work in CS 546',
    to: '/projects/personal#web-programming-i-final-project:-mediahub',
  }),

  Tag(HtmlTag.H3, 'Spring 2021'),
  Tag(
    HtmlTag.P,
    `During this semester, I worked as a Course Assistant for the Systems Programming class at Stevens. I tutored students in course topics such as system calls, concurrent programming, and sockets, while also helping them in understanding Bash and C. Plus, I assessed students with exams written by the professor and self-designed lab assignments.`
  ),
  Tag(HtmlTag.A, 'CS 392 Course Syllabus', {
    href: 'https://web.stevens.edu/academic_files/courses/syllabus/CS392syl.pdf',
    ...openLinkInNewTab,
  }),

  Tag(HtmlTag.H3, 'Fall 2021'),
  Tag(
    HtmlTag.P,
    `For my first semester as a Course Assistant, I was part of the Introduction to Computer Science class at Stevens. I tutored students in course topics such as recursion, memoization, and dynamic programming. Additionally, I conducted labs to train students on topics covered in lecture with Python.`
  ),
  Tag(HtmlTag.A, 'CS 115 Course Syllabus', {
    href: 'https://web.stevens.edu/academic_files/courses/syllabus/CS115syl.pdf',
    ...openLinkInNewTab,
  }),

  Component(ComponentName.Media, {
    Type: MediaType.Img,
    src: '/projects/other/stevens-logo.png',
    mediaProps: { alt: 'Stevens Logo' },
  }),

  Tag(HtmlTag.H2, 'International Ivy'),
  Tag(
    HtmlTag.P,
    `Following my high school graduation, I worked as an instructor at International Ivy's educational summer camp. There, I taught a basic cryptography course to elementary and middle school students. The course, taught using Python, introduced students to fundamental ciphers such as the Caesar, Affine, and Vigenère Ciphers. I further contributed by customizing lesson plans to help students learn more effectively.`
  ),
  Tag(HtmlTag.A, 'International Ivy homepage', {
    href: 'http://www.iisummer.com/',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.Media, {
    Type: MediaType.Img,
    src: '/projects/other/international-ivy-logo.jpg',
    mediaProps: { alt: 'International Ivy Logo' },
  }),

  Tag(HtmlTag.H2, 'Mathnasium'),
  Tag(
    HtmlTag.P,
    `During my senior year of high school, I worked at my local Mathnasium franchise, a company that helps students in grades K-12 understand and learn math. I teach everything from basic arithmetic to introductory calculus.`
  ),
  Tag(HtmlTag.A, 'Mathnasium of Northeast Parsippany homepage', {
    href: 'https://www.mathnasium.com/neparsippany',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.Media, {
    Type: MediaType.Img,
    src: '/projects/other/mathnasium-indoor.jpg',
    mediaProps: { alt: 'Mathnasium Parsippany Interior' },
  }),

  Tag(HtmlTag.H2, 'Boy Scouts of America'),
  Tag(
    HtmlTag.P,
    `My first job, at the age of 14, was a volunteer camp counselor for the Boy Scouts' Summer STEM Institute (SSI). The following year, I worked for SSI as a paid counselor. My role was to help boys and girls in grades 1 through 6 learn about the different aspects of the STEM subjects.`
  ),
  Tag(HtmlTag.A, 'SSI Facebook Page', {
    href: 'https://www.facebook.com/SummerSTEMInstitute/',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.Media, {
    Type: MediaType.Img,
    caption: 'Helping students build a kit kart',
    src: '/projects/other/bsa-kart-activity.jpg',
    mediaProps: { alt: 'BSA Kart Activity' },
  }),
]

export default data
