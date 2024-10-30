# Gizzia API Documentation

## Models

### Users

```m
- _id: ObjectId, required
- name: string, required
- username: string, required, unique
- email: string, required, unique
- password: string, required
- gender: string
- dateOfBirth: string
- imageProfileUrl: string
- createdAt: date
- updatedAt: date
```

### Identifications

```m
- _id: ObjectId, required
- imageUrl: string, required
- result: Object, required
- userId: ObjectId, required
- createdAt: date
- updatedAt: date
```

### Healths

```m
- _id: ObjectId, required
- recommendation: Object, required
- userId: ObjectId, required
- createdAt: date
- updatedAt: date
```

### Articles

```m
- _id: ObjectId, required
- title: string, required
- content: string, required
- imageUrl: string
- category: string, required
- tags: Array, required
- userId: ObjectId, required
- createdAt: date
- updatedAt: date
```

### Posts

```m
- _id: ObjectId, required
- title: string, required
- content: string, required
- imageUrl: string
- category: string, required
- authorId: ObjectId, required
- createdAt: date
- updatedAt: date
```

### Likes

```m
- _id: ObjectId, required
- postId: ObjectId, required
- userId: ObjectId, required
- createdAt: date
- updatedAt: date
```

### Comments

```m
- _id: ObjectId, required
- postId: ObjectId, required
- userId: ObjectId, required
- content: string, required
- createdAt: date
- updatedAt: date
```

### Messages

```m
- _id: ObjectId, required
- message: string, required
- userId: ObjectId, required
- createdAt: date
- updatedAt: date
```

### Donations

```m
- _id: ObjectId, required
- userId: ObjectId, required
- description: string
- amount: number, required
- status: string, required
- createdAt: date
- updatedAt: date
```

### Advertisings

```m
- _id: ObjectId, required
- imageUrl: string, required
- url: string, required
- userId: ObjectId, required
- description: string
- status: string, required
- createdAt: date
- updatedAt: date
```

## Endpoints

List of available endpoints:

### Users

- `POST /register`
- `GET /login`
- `GET /users/:id` (authentication)
- `PUT /users/:id` (authentication & authorization)

### Identifications

- `GET /identifications`
- `POST /identifications`
- `POST /identifications/save` (authentication)

### Healths

- `GET /healths`
- `POST /healths`
- `POST /healths/`
- `POST /healths/recommendation`
- `POST /healths/recommendation/save` (authentication)

### Articles

- `GET /articles`
- `GET /articles/:id`
- `POST /articles` (authentication)
- `PUT /articles/:id` (authentication & authorization)
- `DELETE /articles/:id` (authentication & authorization)

### Posts

- `GET /posts`
- `GET /posts/:id`
- `POST /posts` (authentication)
- `PUT /posts/:id` (authentication & authorization)
- `DELETE /posts/:id` (authentication & authorization)

#### Posts - Likes

- `GET /posts/:id/likes` (authentication)
- `POST /posts/:id/likes` (authentication)

#### Posts - Comments

- `GET /posts/:id/comments` (authentication)
- `POST /posts/:id/comments` (authentication)

### Messages

- `GET /messages` (authentication)
- `POST /messages`
- `POST /messages/save` (authentication)

### Donations

- `GET /donations`
- `POST /donations` (authentication)
- `PUT /donations/:id` (authentication)

### Advertisings

- `GET /advertisings`
- `POST /advertisings` (authentication)
- `PUT /advertisings/:id` (authentication)
