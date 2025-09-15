-- First clean up (truncate all tables)
TRUNCATE TABLE "task", "team_member_ship", "role", "team", "user" RESTART IDENTITY CASCADE;

-- USERS
INSERT INTO "user" (
  id, user_name, first_name, last_name, email, password, is_verified, is_active, is_staff, date_joined, "lastLogin"
) VALUES
(uuid_generate_v4(), 'admin', 'System', 'Admin', 'admin@example.com', 'hashed_password_here', true, true, true, NOW(), NULL),
(uuid_generate_v4(), 'jdoe', 'John', 'Doe', 'johndoe@example.com', 'hashed_password_here', true, true, false, NOW(), NULL),
(uuid_generate_v4(), 'asmith', 'Alice', 'Smith', 'alicesmith@example.com', 'hashed_password_here', false, true, false, NOW(), NULL);

-- TEAMS
INSERT INTO "team" (
  id, name, description, created_at, updated_at
) VALUES
(uuid_generate_v4(), 'Engineering', 'Handles backend and frontend development.', NOW(), NOW()),
(uuid_generate_v4(), 'Marketing', 'Focuses on product promotion and campaigns.', NOW(), NOW());

-- ROLES
INSERT INTO "role" (
  id, name, description
) VALUES
(uuid_generate_v4(), 'Team Lead', 'Responsible for leading the team and managing projects.'),
(uuid_generate_v4(), 'Developer', 'Builds and maintains applications.'),
(uuid_generate_v4(), 'Designer', 'Designs UI/UX and branding materials.');

-- TEAM MEMBERSHIPS
INSERT INTO "team_member_ship" (
  id, name, description, user_id, team_id, role_id
) VALUES
(uuid_generate_v4(), 'John in Engineering', 'Backend developer in Engineering team.', 
 (SELECT id FROM "user" WHERE user_name = 'jdoe'),
 (SELECT id FROM "team" WHERE name = 'Engineering'),
 (SELECT id FROM "role" WHERE name = 'Developer')),

(uuid_generate_v4(), 'Alice in Marketing', 'UI designer in Marketing team.',
 (SELECT id FROM "user" WHERE user_name = 'asmith'),
 (SELECT id FROM "team" WHERE name = 'Marketing'),
 (SELECT id FROM "role" WHERE name = 'Designer')),

(uuid_generate_v4(), 'Admin in Engineering', 'Admin assigned as team lead in Engineering team.',
 (SELECT id FROM "user" WHERE user_name = 'admin'),
 (SELECT id FROM "team" WHERE name = 'Engineering'),
 (SELECT id FROM "role" WHERE name = 'Team Lead'));

-- TASKS
INSERT INTO "task" (
  id, name, description, user_id
) VALUES
(uuid_generate_v4(), 'Setup Database', 'Initialize PostgreSQL with schemas and migrations.',
 (SELECT id FROM "user" WHERE user_name = 'jdoe')),

(uuid_generate_v4(), 'Design Homepage', 'Create Figma mockups for homepage layout.',
 (SELECT id FROM "user" WHERE user_name = 'asmith')),

(uuid_generate_v4(), 'Deploy App', 'Deploy app to production environment.',
 (SELECT id FROM "user" WHERE user_name = 'admin'));