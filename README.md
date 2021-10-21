# Portfolio-website
Portfolio Website made using 3js!
## Installation
 
1. Clone the repo
```sh
git clone https://github.com/vidhik2002/Portfolio-website.git
```
2. Move into folder
```sh
cd portfolio
```
3. Edit content.js
```sh
var content = {
    "name": "<YOUR_NAME>",
    "description": "<ONELINE_DESCRIPTION>",
    "button": "<TEXT_ON_BUTTON>",
    "onelinedescription":"<ONELINE_DESCRIPTION_ABOUTME>",
    "aboutdescription": "<DESCRIPTION_ABOUTME>",
    "contactdescription":"<DESCRIPTION_CONTACT>",
    "address": "<ADDRESS>",
    "phone": "<PHONE_NO.>",
    "email": "<GMAIL>"
}
```
4. Run the command
```sh
node index.js
```
## Deployment

### For development:
```sh
npm run dev
```
### For production:
Pre-requisite-
```sh
npm i serve -g
```
Run the following commands
```sh
1. npm run build
2. serve dist
```
### For Dockerization
Run the following commands
```sh
1.  docker build . -t <your username>/<name-of-node-application> --network=host
2.  docker images
3.  docker run -p 3000:3000 -d <your username>/<name-of-node-application>
```
