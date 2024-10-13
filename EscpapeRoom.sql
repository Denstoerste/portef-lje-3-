CREATE DATABASE EscapeRoomDB;
USE EscapeRoomDB;

CREATE TABLE EscapeRooms (
    RoomID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Theme VARCHAR(255),
    DifficultyLevel ENUM('Easy', 'Medium', 'Hard', 'Expert') NOT NULL,
    Duration INT NOT NULL
);

CREATE TABLE Puzzles (
    PuzzleID INT AUTO_INCREMENT PRIMARY KEY,
    RoomID INT,
    PuzzleName VARCHAR(255) NOT NULL,
    Description TEXT,
    PuzzleType ENUM('Logic', 'Search', 'Riddle', 'Physical', 'Combination') NOT NULL,
    DifficultyRating INT CHECK(DifficultyRating BETWEEN 1 AND 5),
    FOREIGN KEY (RoomID) REFERENCES EscapeRooms(RoomID) ON DELETE CASCADE
);

CREATE TABLE Teams (
    TeamID INT AUTO_INCREMENT PRIMARY KEY,
    TeamName VARCHAR(255) NOT NULL,
    StartTime DATETIME,
    EndTime DATETIME,
    CompletionStatus ENUM('Solved', 'Timed Out', 'In Progress') NOT NULL
);

CREATE TABLE Players (
    PlayerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Nickname VARCHAR(255),
    Email VARCHAR(255) UNIQUE
);

CREATE TABLE TeamProgress (
    ProgressID INT AUTO_INCREMENT PRIMARY KEY,
    TeamID INT,
    PuzzleID INT,
    StartTime DATETIME,
    EndTime DATETIME,
    SolvedStatus ENUM('Solved', 'Failed', 'In Progress') NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (PuzzleID) REFERENCES Puzzles(PuzzleID) ON DELETE CASCADE
);

CREATE TABLE Hints (
    HintID INT AUTO_INCREMENT PRIMARY KEY,
    PuzzleID INT,
    HintText TEXT NOT NULL,
    UsageCount INT DEFAULT 0,
    FOREIGN KEY (PuzzleID) REFERENCES Puzzles(PuzzleID) ON DELETE CASCADE
);

CREATE TABLE PlayerActions (
    ActionID INT AUTO_INCREMENT PRIMARY KEY,
    PlayerID INT,
    PuzzleID INT,
    ActionType ENUM('Attempt', 'HintRequest', 'Other') NOT NULL,
    ActionTimestamp DATETIME NOT NULL,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (PuzzleID) REFERENCES Puzzles(PuzzleID) ON DELETE CASCADE
);

CREATE TABLE PlayerTeams (
    PlayerTeamID INT AUTO_INCREMENT PRIMARY KEY,
    PlayerID INT,
    TeamID INT,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE
);

INSERT INTO EscapeRooms (Title, Theme, DifficultyLevel, Duration)
VALUES ('Haunted Mansion', 'Horror', 'Hard', 60),
       ('Alien Invasion', 'Sci-Fi', 'Medium', 45),
       ('Bank Heist', 'Crime', 'Expert', 75);
       
INSERT INTO Puzzles (RoomID, PuzzleName, Description, PuzzleType, DifficultyRating)
VALUES (1, 'Haunted Key', 'Find the hidden key using clues in the room', 'Search', 4),
       (1, 'Ghost Cipher', 'Solve the cipher to reveal the code', 'Logic', 5),
       (2, 'Alien Lock', 'Unlock the spaceship door', 'Riddle', 3),
       (3, 'Vault Code', 'Crack the vault code', 'Combination', 5);
       
INSERT INTO Teams (TeamName, StartTime, EndTime, CompletionStatus)
VALUES ('Escape Pros', '2024-10-07 14:00:00', '2024-10-07 14:55:00', 'Solved'),
       ('Puzzle Masters', '2024-10-07 15:00:00', '2024-10-07 16:00:00', 'Timed Out');
       
INSERT INTO Players (Name, Nickname, Email)
VALUES ('John Doe', 'J-Dawg', 'john@example.com'),
       ('Jane Smith', 'Smarty', 'jane@example.com'),
       ('Robert Brown', 'Robo', 'robert@example.com');
       
INSERT INTO PlayerTeams (PlayerID, TeamID)
VALUES (1, 1),
       (2, 1),
       (3, 2);
       
INSERT INTO TeamProgress (TeamID, PuzzleID, StartTime, EndTime, SolvedStatus)
VALUES (1, 1, '2024-10-07 14:05:00', '2024-10-07 14:15:00', 'Solved'),
       (1, 2, '2024-10-07 14:16:00', '2024-10-07 14:45:00', 'Solved'),
       (2, 3, '2024-10-07 15:05:00', '2024-10-07 15:55:00', 'Failed');
       
INSERT INTO Hints (PuzzleID, HintText, UsageCount)
VALUES (1, 'Look under the floorboards', 3),
       (2, 'Check the painting for clues', 2),
       (3, 'Try using the alien alphabet', 1);

INSERT INTO PlayerActions (PlayerID, PuzzleID, ActionType, ActionTimestamp)
VALUES (1, 1, 'Attempt', '2024-10-07 14:06:00'),
       (2, 1, 'HintRequest', '2024-10-07 14:10:00'),
       (3, 3, 'Attempt', '2024-10-07 15:10:00');








