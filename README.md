worklog-jira
============

Web application to report worklogs by issue and user from JIRA

### How to install it

Ensure nodejs is already installed : http://nodejs.org/

Install all dependencies, run this command at the root of your `<installation-path>`: 

    npm install

Copy/paste your whole client-side app inside a `public` folder located at the root of `<installation-path>`

Copy/paste your certificate `<certificate-name>.cer` inside a `certificat` folder located at the root of `<installation-path>` (this `certificateLocation` is configurable inside `config.js` file.

Choose your environment `port` inside `config.js` file

### Run your app

Run your nodejs app, run this command at the root of your `<installation-path>`:

    node app.js

### Access your app

    http://localhost:<port>
