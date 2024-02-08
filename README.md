# What is QUIZZICAL
"Quizzical" is a solo project given by Scrimba's course named "Learn React" held on Coursera.

## What this app does
Users are given several random questions fetched from "Open TRIVIA DATABASE" and the answers are checked and then the user's score is visible at the end.

## What is interesting about this project
This SPA (Single-page application), thanks to React, has been coded componential using conditional rendering (without React Router library) and maintains a single source of truth (SSOT) by storing and handling given data in an abject state created by the useState hook.
Components are functional and states are passed down through props.

## How this app works
Especially, for this kind of app named Quizzical, The questions get fetched after the user clicks on the start button. The questions type is multiple choice and are designed using radio buttons. Although the questions might be the same, options are randomly ordered. After the user responses are checked, correct answers and user-selected options will be indicated by colors thanks to conditional class and conditional inline style.

**You can see the UI on [Netlify](https://quizzical-mote.netlify.app/)**
