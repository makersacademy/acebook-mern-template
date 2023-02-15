## Summary
​
#### we're now bringing together the work we've done on models and controllers and updating the views. Essentially, working on the client side of things. 
​
# NB some of the .css or cy.js files are not present in the directory
```
src
├── components
│   ├── app
│   │   ├── App.css  ▐ {stylesheet for the main app}
│   │   └── App.js   ▐ {imports app.css and .js component files}
│   ├── auth
│   │   ├── LoginForm.cy.js ▐ 
│   │   └── LoginForm.js    ▐ {contains elements for login}
│   ├── createPost
│   │   └── CreatePost.js   ▐ {contains elements for creating post}
│   ├── feed
│   │   ├── Feed.css        ▐
│   │   ├── Feed.cy.js      ▐
│   │   └── Feed.js         ▐ {contains all components that appear in the feed}
│   ├── post
│   │   ├── Post.css        ▐ 
│   │   ├── Post.cy.js      ▐
│   │   └── Post.js         ▐ {contains elements an individual post}
│   └── user
│       ├── SignUpForm.cy.js ▐
│       ├── SignUpForm.js    ▐ {contains elements for signup}
│       └── SignUpForm.css   ▐
├── index.css                ▐ {Bootstrap css file(copied and pasted)}
├── index.js                 ▐ {imports App.js} 
├── reportWebVitals.js    
└── setupTests.js
```