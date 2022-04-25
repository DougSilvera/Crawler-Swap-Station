USE [master]

IF db_id('CrawlerSwapStation') IS NULl
  CREATE DATABASE [CrawlerSwapStation]
GO

USE [CrawlerSwapStation]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Listing];
DROP TABLE IF EXISTS [Scale];
DROP TABLE IF EXISTS [Vehicle];
DROP TABLE IF EXISTS [UserFavorite];
DROP TABLE IF EXISTS [Message];
DROP TABLE IF EXISTS [UserFollow];
DROP TABLE IF EXISTS [Image];
GO



CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DisplayName] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Phone] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Listing] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [DateCreated] datetime NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Body] nvarchar(255) NOT NULL,
  [ScaleId] int,
  [VehicleId] int
)
GO

CREATE TABLE [Scale] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Vehicle] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserFavorite] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ListingId] int NOT NULL
)
GO

CREATE TABLE [Message] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SenderId] int NOT NULL,
  [Subject] nvarchar(255),
  [Body] nvarchar(255),
  [RecipientId] int
)
GO

CREATE TABLE [UserFollow] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [FollowingId] int NOT NULL
)
GO

CREATE TABLE [Image] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ListingId] int NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Listing] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Listing] ADD FOREIGN KEY ([ScaleId]) REFERENCES [Scale] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [Listing] ADD FOREIGN KEY ([VehicleId]) REFERENCES [Vehicle] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [UserFavorite] ADD FOREIGN KEY ([ListingId]) REFERENCES [Listing] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserFavorite] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([SenderId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([RecipientId]) REFERENCES [User] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [UserFollow] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserFollow] ADD FOREIGN KEY ([FollowingId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Image] ADD FOREIGN KEY ([ListingId]) REFERENCES [Listing] ([Id]) ON DELETE CASCADE
GO
