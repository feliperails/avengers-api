CREATE TABLE [avengers].[hero](
	[id_hero] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [text] NULL,
	[image_path] [varchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [avengers].[register](
	[id_register] [int] IDENTITY(1,1) NOT NULL,
	[id_hero] [varchar](50) NOT NULL,
	[name] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[source] [varchar](50) NULL
) ON [PRIMARY]
GO