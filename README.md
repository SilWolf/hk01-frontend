This is the source code of HK01 Frontend Codetest, by Dicky Chan.

### Quick Links
[Demo Page (https://silwolf.io/hk01-codetest/frontend/)](https://silwolf.io/hk01-codetest/frontend)

[Requirement (PDF file)](https://silwolf.io/hk01-codetest/frontend-requirement.pdf)

[Dicky's Resume](https://silwolf.io/resume)

### Features

#### Recommand apps listing
A list of top 10 grossing applications.

#### Top 100 free apps listing
A list of max. top 100 free applications. Initially displays 10 applications, and lazy loads more when scrolling to the bottom.

#### Searching within Top 100 free apps
Prototype searching. Case sensitive.

#### App details
App detail page with description and ratings. Can be accessed via clicking on any application item in lists.

### Known issue
* User can still scroll the page when search panel is active.

### Run on local
```
# Clone it
git clone https://github.com/SilWolf/hk01-frontend.git
cd hk01-frontend
npm install
npm run start

# to do test
npm run test

# to build
npm run build
```

### Technique & Used library
* React
  * Redux
  * React Router
  * Styled Component
  * Material UI
* HTML
* CSS

### Patch Notes
#### v1.0.0
Initial release.