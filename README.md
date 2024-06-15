# Electric Gadgets Management System
##Live Link:https://assignment-6-hs7hob0v3-zibranhasansourabgmailcoms-projects.vercel.app
## Manager info(for login):
name:zibran hasan
password:sourav

### user info(for login):
name:zibran
password:123456


## Backend Overview

### Objective

Develop an Electric Gadgets Management Dashboard backend with authentication, CRUD operations, real-time updates, and advanced filtering capabilities.

### Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- RTK Query
- Redux

## Features

### Authentication

- JWT for secure authentication
- Role-based access control (User, Manager)

### Electric Gadgets Management

- CRUD operations (Create, Read, Update, Delete)
- Advanced filtering (Price range, Release date, Brand, Category)

### Sales History

- Categorized sales reports (Weekly, Daily, Monthly, Yearly)

## Functionality

### Electric Gadgets Management

#### CRUD Operations

- Add a new Electric gadget to the inventory
- Delete existing Electric gadgets from the inventory
- Update Electric gadget details
- Read and view the list of Electric gadgets in the inventory

#### Filtering

- Filter by Price Range
- Filter by Release Date
- Filter by Brand
- Filter by Model Number
- Filter by Category
- Filter by Operating System
- Filter by Connectivity
- Filter by Power Source
- Filter by Features
- Additional Relevant Filter Parameters

### Sales History

- View sales history categorized by:
  - Weekly
  - Daily
  - Monthly
  - Yearly

### User Interface Features

- Gracefully update the UI in real-time when changes occur (e.g., product updates, sales, etc.)
- Utilize RTK Query for efficient CRUD operations
- Implement Re-fetching functionality to ensure data accuracy and consistency
- Utilize Redux for state management to maintain a consistent application state

### Bulk Delete Product Options

- Enable managers to efficiently manage their inventory by implementing a bulk delete feature for the Electric gadgets
- Provide a user-friendly interface to select and delete multiple Electric gadgets options simultaneously
- Implement a "Duplicate & Edit" or "Create Variant" feature within the product list for easy modification and creation of new products based on existing ones

### Cart System

- Users with the roles of "Manager" or "User" have the capability to add products to the cart
- Each product card will feature an "Add to Cart" button for adding the product to the cart
- The "Add to Cart" button will dynamically respond to prevent duplicate entries

### Checkout Page

- Display a summary of cart contents along with the respective quantities of each product added
- Dynamically calculate and display the total amount based on the quantities of products in the cart and their corresponding prices
- Allow users to increase or decrease the quantities of products in the cart directly from the checkout page
- Ensure that the quantity of the product to be sold does not exceed the current available stock
- Remove products from the inventory if their quantity reaches zero after selling
- Allow users to remove products entirely from the cart
- Include fields for the buyer's name, contact number, and the selling date for accurate record-keeping

### Additional Features

- Implement any other relevant features that enhance the usability and functionality of the dashboard

## Technical Requirements

- Use RTK Query for efficient CRUD operations
- Implement Redux for state management
- Ensure the UI updates gracefully in real-time
- Use the Re-fetching functionality for data accuracy
- Apply tags for improved organization and categorization
- Optimize for mobile responsiveness to ensure a reasonable user experience on various devices
- Ensure there are at least 10 commits in your GitHub repository
- Avoid the use of AI tools or libraries for generating code. Write the code manually to demonstrate a clear understanding of the concepts
- Apply the modular pattern for enhanced code organization and maintainability

## Running the Application

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add the following variables:

      ```bash
      JWT_SECRET=<your-secret-key>
      MONGODB_URI=<your-mongodb-uri>
      ```

4. **Start the development server:**

    ```bash
    npm run start:dev
    ```






