INSERT INTO users (name, email, joined) 
VALUES ($1, $2, $3)
RETURNING *;
