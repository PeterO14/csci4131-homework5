CREATE TABLE contact_me (
    message_id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    link VARCHAR(50) NOT NULL,
    message_category VARCHAR(50) NOT NULL,
    note VARCHAR(150) NOT NULL,
    PRIMARY KEY(message_id)
);