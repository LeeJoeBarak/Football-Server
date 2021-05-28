CREATE TABLE dbo.Games
(
    id int IDENTITY(1,1) PRIMARY KEY,
    gameDate DATE NOT NULL,
    startTime VARCHAR(100) NOT NULL,
    hostName varchar(255) NOT NULL,
    guestName varchar(255) NOT NULL,
    hostId int NOT NULL,
    guestId int NOT NULL,
    field varchar(255) NOT NULL,
    scoreHost int NOT NULL,
    scoreGuest int NOT NULL
);



CREATE TABLE dbo.GameEvents
(
    id int IDENTITY(1,1) PRIMARY KEY,
    gameId int NOT NULL,
    gameDate DATE NOT NULL,
    gameMinute VARCHAR(100) NOT NULL,
    eventDesc varchar(500) NOT NULL

);