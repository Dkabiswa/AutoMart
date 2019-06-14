[![Build Status](https://travis-ci.org/Dkabiswa/AutoMart.svg?branch=develop)](https://travis-ci.org/Dkabiswa/AutoMart)
[![Coverage Status](https://coveralls.io/repos/github/Dkabiswa/AutoMart/badge.svg)](https://coveralls.io/github/Dkabiswa/AutoMart)
[![Maintainability](https://api.codeclimate.com/v1/badges/9836f8ac998f764731e2/maintainability)](https://codeclimate.com/github/Dkabiswa/AutoMart/maintainability)

# AUTOMART
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type.


## PHASE 1
### User Interfaces

   1. [Users can login/Sign Up](https://dkabiswa.github.io/AutoMart/UI/login.html)
   2. [Seller can post car advert](https://dkabiswa.github.io/AutoMart/UI/advert.html)
   3. [User can view specific car](https://dkabiswa.github.io/AutoMart/UI/vehicle.html)
   4. [Buyer should be able to make purchase](https://dkabiswa.github.io/AutoMart/UI/purchase.html)  
   5. [User can view all unsold cars](https://dkabiswa.github.io/AutoMart/UI/unsold.html)
   6. [User can report/flag ad fraudulent](https://dkabiswa.github.io/AutoMart/UI/report.html)
   7. [Seller can mrk their car sold](https://dkabiswa.github.io/AutoMart/UI/marksold.html)
   8. [Admin can view all cars and delete ads](https://dkabiswa.github.io/AutoMart/UI/admin.html)
   9. [Seller can update price of thier car](https://dkabiswa.github.io/AutoMart/UI/updateAd.html)
   10. [Buyer can update price of their purchase](https://dkabiswa.github.io/AutoMart/UI/updatePurchase.html)

## Developed using

 - HTML5
 - CSS3
 - Javascript ES6
 
# PHASE 2

### API
## Requirements

* [node & npm](https://nodejs.org/en/)
* [git](https://www.robinwieruch.de/git-essential-commands/)


## Installation

* `git clone https://github.com/Dkabiswa/AutoMart.git`
* `cd AutoMart`
* `npm install`
* create .env file and define your SECRET_KEY
* `npm start`
* optional: include *.env* in your *.gitignore*

## Testing

* `npm test`

### Routes
* visit http://localhost:3000

|  Car   |   
|---|---|
| /api/v1/car/:id  | Get specific car   | GET|
| /api/v1/car/  |  Get all cars | GET  | 
| /api/v1/car/:id/status| Mark car sold  | POST  |
| /api/v1/car?status=available  | Get unsold cars | GET  | 
| /api/v1/car?status=available&minPrice=XXXValue&maxPrice=XXXValue | Get unsold cars in a price range | GET |
| /api/v1/car/:id |  Delete a car|  DELETE|
| /api/v1/car/:id/prrice| Update Price of a car  | PATCH|


|  Order   |   
|---|---|
| /api/v1/order/  | Create New order  | POST  | 
| /api/v1/order/:id/price  |  Update price of order | PATCH |   

|  User   |   
|---|---|
| /api/v1/auth/login/  | login User  | POST |  
| /api/v1/auth/signup  | Signup user | POST |
