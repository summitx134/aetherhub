-- AetherHub Community Seed Data
-- Run: psql -U postgres -d aetherhub -f scripts/seed-community.sql
-- Or: pnpm db:seed (if package.json script is added)

-- Note: This is a template. Replace placeholder values with your real
-- content before production deployment.

-- The exact table names and schema depend on your market database structure.
-- This script provides the pattern. Contact the original LobeHub team or
-- check apps/server/src/routers/lambda/market/ for exact schema.

-- === Example: Seed assistants (agents) ===
-- INSERT INTO agents (id, name, description, avatar, author, stars, tags, created_at)
-- VALUES
--   ('aetherhub-001', 'AetherHub Chat', 'Your intelligent AI assistant', '🤖', 'AetherHub', 1000, ARRAY['chat', 'general'], NOW()),
--   ('aetherhub-002', 'Code Reviewer', 'Automated code review and suggestions', '🔍', 'AetherHub', 850, ARRAY['dev', 'code'], NOW()),
--   ('aetherhub-003', 'Data Analyst', 'Analyze data and generate insights', '📊', 'AetherHub', 720, ARRAY['data', 'analytics'], NOW());

-- === Example: Seed skills ===
-- INSERT INTO skills (id, name, description, category, author, stars, icon, created_at)
-- VALUES
--   ('skill-dev-001', 'Git Assistant', 'Git operations made easy', 'dev', 'AetherHub', 500, '🔧', NOW()),
--   ('skill-design-001', 'UI Designer', 'Create beautiful interfaces', 'design', 'AetherHub', 400, '🎨', NOW());

-- === Verification ===
-- After seeding, verify with:
-- SELECT COUNT(*) FROM agents;
-- SELECT COUNT(*) FROM skills;
