
# Welcome to the Circle Take-Home Assignment

  

Thank you for participating in our take-home assignment.

To access the full instructions and requirements, please follow the steps below.

  

## Prerequisites

  

Before you begin, ensure that you have the following software installed on your system:

  

-  **Node.js**: version 22.14.0 and above

-  **Yarn**: version 1.22 and above

  

## Setup Instructions

  

Please follow the steps below to set up and run the application.

  

### 1. Install Dependencies

  

```bash

yarn  install

```

  

### 2. Run the Application

  

```bash

yarn  dev

```

  

After executing these steps, the application should be running locally.

Please open your browser and navigate to http://localhost:3000 to view the

full instructions and requirements for the assignment.

  

We look forward to your submission. If you have any questions, please don't hesitate to reach out.

  

Best regards,

  

The Circle Team

# Ryan's Submission
## Installation
Some new modules were added, so running an `npm install` or `yarn install` will be necessary.

## Layout

I was asked to create a one page application, so my aim was to have everything displayed cleanly without the need for scrolling or modals, etc. I kept the general light/dark combination as seen in the rest of the application and created a button on the landing page to route you to my new page.
## Top 25 transactions
I had a couple of options in mind for how to handle bringing in the payment data, but decided to call the GET api every 1.25 seconds to keep it 'live' but to also allow some padding on the 1 second refresh from the api. I kept the styling simple and clean so that the requested data can be easily seen. 
## Search functionality
For this, I had the search functionality be live as you type. I did not include any partial matches for this example, but you are able to search by any piece of data in the transaction history, regardless of it being rendered. I have added a sort button to flip the order of sort and it is based on the date field. Default order is the most recent being on top.

For the date picker, I decided to auto-select today's date but give the user an option to 'schedule' a future payment so-to-speak.
## Payment Submission form
This one is pretty simple. I used a default datepicker and dropdowns for the sender/receiver. I have it set up to where you cannot select the same user for sender/receiver per the API's functionality. The selectable currencies are directly tied to the pre-defined list of currencies so that if they were added on the backend, the frontend would pick them up automatically. 

Behind the scenes here I generate a random ID similar to what is done in payments.ts and match up the selected user's name to their ID so I can send that to the POST api. My error handling consists of a 5-second popup at the bottom of the field to inform the user of an error and to suggest a reattempt. I also log the error status code to the console.

## Other

In SearchPayments.tsx, I used an 'any' type in the recursive search function. I do not normally use them, but was seeing a different type on obj depending on when that function was 
being called. There are a few EsLint errors surrounding this. I would have pursued this further with more time and abiliity to discuss lint rules.

There are a couple Eslint errors in my code that I spent some time adjusting, but for the 'scrollbar-hide' error, I wasn't sure how to resolve without messing with rules and the comment for ignoring next or current lines did not work. I have a lot of errors around JSX props not using arrow functions, and opted to leave them for a couple of reasons. One reason is that other options (callbacks, moving function args into the child components) felt unclean to me and the other reason is I had done some reading about how this is pretty much a non-issue in reality. If I were on a team who was strict about this I'd be happy to learn best practices, but I feel like these arrow functions are not causing issue here.