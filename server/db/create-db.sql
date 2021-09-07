SELECT 'CREATE DATABASE queueappdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'queueappdb')\gexec