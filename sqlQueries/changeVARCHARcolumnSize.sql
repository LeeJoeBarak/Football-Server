--ALTER TABLE dbo.Games ALTER COLUMN host_team int NOT NULL

--ALTER TABLE dbo.Games ALTER COLUMN guest_team int NOT NULL

--sp_RENAME 'dbo.Games.[host_team]' , '[host_team_id]', 'COLUMN'

--ALTER TABLE dbo.Games
--DROP COLUMN host_team;