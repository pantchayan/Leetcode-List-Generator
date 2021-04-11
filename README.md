# Leetcode-List-Generator
Node.js script to generate list of questions in csv format based on tags (DS-Algo)

## How to run
### 1. Go to res>tags.txt for input tags (DS and Algo topics)
**Note:** Make sure that the tags are valid and space seperated.
### 2. npm install
To install relevant dependencies from node package manager
### 3. node Generator.js
Entry point

## Result
A xlsx (csv) file will be generated in **res folder** with details like each question's:
1. Number
2. Name
3. Acceptance Rate
4. Difficulty
5. Link

## Dependecies / Technologies
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
Node.js modules:
Puppeteer
xlsx 
fs
