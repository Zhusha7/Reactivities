# Reactivities

This repository contains the source code for the Udemy course **"Complete Guide to Building an App with .NET Core and React"**. You can find the course here:

[Complete Guide to Building an App with .NET Core and React](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/)

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   [.NET Core SDK (6.0 or later)](https://dotnet.microsoft.com/download)
-   [Node.js (14 or later)](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/) (optional, can also use npm)

## Getting Started

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/reactivities.git
    cd reactivities
    ```

2. **Run the API**

    ```bash
    cd API
    dotnet run
    ```

    The API will start on `https://localhost:5001` by default.

3. **Run the React client**

    ```bash
    cd ../client
    yarn install    # or npm install
    yarn start      # or npm start
    ```

    Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```text
Reactivities/
├── API/            # .NET Core Web API project
└── client/         # React frontend application
```
