<h1 align="center">
    LIBRARY MANAGEMENT SYSTEM
</h1>

<h4>
A simple and efficient Library Management System that allows users to manage books in a library, with functionalities for creating, reading, updating, and deleting (CRUD) book records.
  The project includes a backend API built with C# .NET and an SQLite database, and a frontend developed with React and TypeScript.
</h4>

## Features

<ul>
        <li><strong>Book CRUD Operations:</strong>
            <ul>
                <li><strong>Create:</strong> Add new book records with title, author, and description.</li>
                <li><strong>Read:</strong> View a list of existing book records.</li>
                <li><strong>Update:</strong> Edit and update existing book records.</li>
                <li><strong>Delete:</strong> Remove book records from the library.</li>
            </ul>
        </li>
        <li><strong>User Authentication:</strong>
            <ul>
                <li>Includes basic user authentication and registration to enhance security.</li>
            </ul>
        </li>
    </ul>


<h2>Technologies Used</h2>
    <ul>
        <li><strong>Backend:</strong> C# .NET Core with Entity Framework, SQLite database.</li>
        <li><strong>Frontend:</strong> React with TypeScript.</li>
        <li><strong>Version Control:</strong> Git</li>
    </ul>

<h2>Project Structure</h2>
    <ul>
        <li><strong>Backend:</strong>
            <ul>
                <li>RESTful API endpoints for book management.</li>
                <li>Entity Framework for database integration.</li>
                <li>Error handling and validation for robust API operations.</li>
            </ul>
        </li>
        <li><strong>Frontend:</strong>
            <ul>
                <li>Responsive and user-friendly interface.</li>
                <li>CRUD operations fully integrated with the backend API.</li>
                <li>Input validation and error handling for form submissions.</li>
            </ul>
        </li>
    </ul>

<h2>Setup Instructions</h2>

  <h3>Prerequisites</h3>
    <ul>
        <li>.NET Core SDK</li>
        <li>Node.js and npm</li>
    </ul>

  <h3>Backend Setup</h3>
    <ol>
        <li>Navigate to the <code>backend</code> directory.</li>
        <li>Run the following commands to set up and run the backend server:
        </li>
    </ol>

```sh
dotnet restore
dotnet build
dotnet run
```

<h3>Frontend Setup</h3>
    <ol>
        <li>Navigate to the <code>frontend</code> directory.</li>
        <li>Install dependencies:
            <pre>
<code>npm install</code>
            </pre>
        </li>
        <li>Run the frontend application:
            <pre>
<code>npm start</code>
            </pre>
        </li>
    </ol>

<h3>Running the Application</h3>
    <p>Once both the backend and frontend servers are running, you can access the application by navigating to <code>http://localhost:3000</code> in your web browser.</p>

  <h2>How to Use</h2>
    <ol>
        <li><strong>Add a Book:</strong> Use the "Add Book" button to create a new book record.</li>
        <li><strong>View Books:</strong> See the list of all books in the library.</li>
        <li><strong>Update a Book:</strong> Click on a book record to edit its details.</li>
        <li><strong>Delete a Book:</strong> Remove a book from the list using the delete option.</li>
    </ol>

