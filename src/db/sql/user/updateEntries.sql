UPDATE users
SET entries = entries + 1
WHERE id = $1
RETURNING entries;
