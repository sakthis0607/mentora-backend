# Mentora Backend API

A simplified backend for a mentorship platform where parents, students, and mentors interact. This API includes role-based authentication, student management, lesson creation, session tracking, and an AI-powered text summarization feature.

## Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)

## Setup & Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-repo-url>
   cd mentora-backend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables:**
   Create a \`.env\` file in the root directory and add the following required variables:
   \`\`\`env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GROQ_API_KEY=your_groq_api_key
   \`\`\`

4. **Run the Server:**
   \`\`\`bash
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   \`\`\`

## API Documentation (Simple)

### Authentication
- \`POST /auth/signup\` - Register a new Parent or Mentor.
- \`POST /auth/login\` - Login and receive a JWT token.
- \`GET /me\` - Get current logged-in user profile.

### Core Features (Require JWT)
- \`POST /students\` - Create a student (Parents only).
- \`GET /students\` - List all students.
- \`POST /lessons\` - Create a lesson (Mentors only).
- \`POST /bookings\` - Assign a student to a lesson (Parents only).
- \`POST /sessions\` - Create a session for a lesson (Mentors only).
- \`GET /lessons/:id/sessions\` - View sessions for a specific lesson.

---

## Add-on Feature: LLM Text Summarization

This API includes an integration with the **Groq** API (using the \`llama-3.1-8b-instant\` model) to summarize text.

### How to set the API key
1. Register for a free developer account at [Groq Console](https://console.groq.com/).
2. Generate an API Key.
3. Add the key to your \`.env\` file as \`GROQ_API_KEY=gsk_...\`. Do not hardcode this key in the source code.

### How to test the endpoint
You can test the summarization route using the following cURL command:

\`\`\`bash
curl -X POST http://localhost:5000/llm/summarize \
-H "Content-Type: application/json" \
-d "{\"text\": \"Mentorship is a relationship in which a more experienced or more knowledgeable person helps to guide a less experienced or less knowledgeable person. The mentor may be older or younger than the person being mentored, but they must have a certain area of expertise. It is a learning and development partnership between someone with vast experience and someone who wants to learn.\"}"
\`\`\`

### Assumptions & Constraints
- **Minimum Length:** The text must be at least 50 characters long, otherwise a 400 Bad Request is returned.
- **Maximum Length:** The text is capped at 10,000 characters to prevent payload abuse, returning a 413 Payload Too Large error if exceeded.
- **Rate Limiting:** A lightweight \`express-rate-limit\` is applied to this route, allowing a maximum of 5 requests per minute per IP to protect the external API.