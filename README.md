# Electron-PharmacyDestopApplication
Desktop application for tracking information about clients in pharmacy

# Installation
- npm i

# Run application
- npm start

# Create window/linux application (.exe)
- npm run package-win
- npm run package-mac

# Functionalities of desktop application
1. Login page with modals by use of ipcMain & ipcChild (in 3 failed tries app closes)  
2. In successful login 4 supported functionalites  
    i.)   Add person (first/last name)  
    ii.)  Search person (datatable with pagination)  
    iii.) Edit person  
    iv.)  Delete person  
All functionalities is based on javascript db "ne" which is suitable for space less than 1/2 GB and is based on Mongo DB API - suitable for stand-alone installation wihout dependencies (more details can be found below as well with Electron default tutorial)


# Electron
Electron (formerly known as Atom Shell) is an open-source framework developed and maintained by GitHub. Electron allows for the development of desktop GUI applications using web technologies: It combines the Chromium rendering engine and the Node.js runtime. Electron is the main GUI framework behind several notable open-source projects including Atom, GitHub Desktop, Light Table, Visual Studio Code, and WordPress Desktop.

https://www.electronjs.org/

# NeDB 
NeDB is a lightweight embedded document DBMS written in JavaScript. It supports Node.js, nw.js, Electron, and web browser environments. It is designed to be partially compatible with MongoDB's JSON-based query API. NeDB is useful for storing small amounts of data in memory. When the amount of data exceeds the bounds of what NeDB can hold effectively, switching to MongoDB is intended to be straightforward because it uses the same API.

https://dbdb.io/db/nedb

# Screenshots from application

- Login Page

![Login Page](https://github.com/gmavridakis/Electron-PharmacyDestopApplication/blob/master/assets/icons/login.png)


- Main Page

![Main Page](https://github.com/gmavridakis/Electron-PharmacyDestopApplication/blob/master/assets/icons/homepage.png)


- Edit Client

![Edit Client](https://github.com/gmavridakis/Electron-PharmacyDestopApplication/blob/master/assets/icons/editclient.png)
