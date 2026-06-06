# Database Setup Guide

## Prerequisites

- PostgreSQL installed and running
- Database created: `engmate`

## Quick Setup

```bash
# Create PostgreSQL database
createdb engmate

# Or using psql
psql -U postgres
CREATE DATABASE engmate;
\q
```

## Environment Configuration

Update `.env` with your database URL:

```bash
DATABASE_URL=postgresql://username:password@localhost/engmate
```

## Running Migrations

```bash
cd backend

# Generate initial migration
alembic revision --autogenerate -m "Initial schema"

# Apply migrations
alembic upgrade head

# Check current version
alembic current

# Rollback one version
alembic downgrade -1
```

## Database Schema

### Users
- Authentication and profile data
- Fields: email, password_hash, name, level, goal, explanation_language

### Sessions
- Learning session tracking
- Fields: mode, topic, lesson_id, started_at, ended_at, duration_seconds

### Utterances
- Conversation history (user + assistant messages)
- Fields: role, transcript, audio_url, raw_llm_json

### FeedbackIssues
- Grammar, vocabulary, pronunciation issues
- Fields: type, issue_code, detail (JSON)

### VocabularyItems
- User's vocabulary collection
- Fields: word, translation, example, source, strength

## Testing Without Database

Set `USE_MOCK_AI=true` in `.env` to run without database persistence.
All endpoints will work with in-memory mock data.
