# Appointment System using NestJS (Simplified)

This is a NestJS project configured to use SQLite as the database.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [NestJS](https://nestjs.com)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/praditautama/appointment-system.git
cd appointment-system
```

### 2. Install all depedencies

```sh
npm install
```

### 4. Run

Rename .env-sample to .env

### 5. Run

```sh
npm run start
```

### 6. Test the endpoints

#### Available Slots

```sh
curl -X GET http://localhost:3000/appointments/slots \
  -H "Authorization: API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-04-04"}'
```

#### Book

```sh
curl -X POST http://localhost:3000/appointments/book \
  -H "Authorization: API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-04-04", "time": "10:00", "email": "user@example.com"}'
```

#### Cancel

```sh
curl -X DELETE http://localhost:3000/appointments/cancel \
  -H "Authorization: API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-04-04", "time": "10:00", "email": "user@example.com"}'
