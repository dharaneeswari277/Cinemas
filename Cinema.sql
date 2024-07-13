SELECT * FROM cinema;
INSERT INTO genres (name) VALUES
('Action'),
('Comedy'),
('Horror'),
('Romance'),
('Sci-Fi')


INSERT INTO movies (name, ticket_price, language, description, show_timings, theatre, is_showing) VALUES
('Extraction', 12.50, 'English', 'An action thriller about a black ops mercenary tasked with rescuing an Indian crime lord’s kidnapped son.', '["10:00", "13:30", "17:00", "20:30"]', 'Main Theatre', true),
('Crawl', 10.00, 'English', 'A group of friends is trapped in a flooding house while a pack of alligators stalks them.', '["11:00", "14:00", "18:00"]', 'Main Theatre', true),
('Rambo: Last Blood', 15.00, 'English', 'Rambo must confront his past and unearth his ruthless combat skills to exact revenge in a final mission.', '["12:00", "15:30", "19:00"]', 'Secondary Theatre', true),
('The Notebook', 8.00, 'English', 'A romantic drama about a young couple falling in love during the summer of 1940.', '["16:00", "21:00"]', 'Main Theatre', true),
('Interstellar', 14.00, 'English', 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival.', '["15:00", "20:00"]', 'IMAX Theatre', true);
