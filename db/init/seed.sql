-- seed.sql: dados de exemplo

-- departments & titles
INSERT INTO department (name) VALUES ('Ciências Exatas'), ('Humanas');
INSERT INTO title (name) VALUES ('Mestre'), ('Doutor'), ('Professor Titular');

-- professors
INSERT INTO professor (name, department_id, title_id) VALUES
 ('Girafales', 1, 2),
 ('Chaves', 2, 1),
 ('Dona Florinda', 1, NULL);

-- buildings
INSERT INTO building (name) VALUES ('Bloco A'), ('Bloco B');

-- rooms
INSERT INTO room (name, building_id) VALUES
 ('Sala 101', 1),
 ('Sala 102', 1),
 ('Sala 201', 2),
 ('Laboratório 1', 2);

-- subjects
INSERT INTO subject (code, name, professor_id) VALUES
 ('MAT101', 'Cálculo I', 1),
 ('COMP202', 'Estruturas de Dados', 2),
 ('HIS303', 'História Antiga', 3);

-- prerequisites
INSERT INTO subject_prerequisite (subject_id, prerequisite_id)
VALUES
 ((SELECT id FROM subject WHERE code = 'COMP202'),
  (SELECT id FROM subject WHERE code = 'MAT101'));

-- classes
INSERT INTO class (subject_id, year, semester, code) VALUES
 ((SELECT id FROM subject WHERE code = 'MAT101'), 2025, 1, 'MAT101-2025-1'),
 ((SELECT id FROM subject WHERE code = 'COMP202'), 2025, 1, 'COMP202-2025-1'),
 ((SELECT id FROM subject WHERE code = 'HIS303'), 2025, 1, 'HIS303-2025-1');

-- class_schedule (aulas com duração variada)
-- MAT101 nas terças e quintas 08:00-10:00 na Sala 101
INSERT INTO class_schedule (class_id, room_id, day_of_week, start_time, end_time)
VALUES
 ((SELECT c.id FROM class c JOIN subject s ON c.subject_id = s.id WHERE s.code='MAT101'), (SELECT id FROM room WHERE name='Sala 101'), 'Tue', '08:00', '10:00'),
 ((SELECT c.id FROM class c JOIN subject s ON c.subject_id = s.id WHERE s.code='MAT101'), (SELECT id FROM room WHERE name='Sala 101'), 'Thu', '08:00', '10:00'),

 -- COMP202 segunda 10:00-12:00 sala 102
 ((SELECT c.id FROM class c JOIN subject s ON c.subject_id = s.id WHERE s.code='COMP202'), (SELECT id FROM room WHERE name='Sala 102'), 'Mon', '10:00', '12:00'),

 -- HIS303 quarta 14:00-16:00 sala 201
 ((SELECT c.id FROM class c JOIN subject s ON c.subject_id = s.id WHERE s.code='HIS303'), (SELECT id FROM room WHERE name='Sala 201'), 'Wed', '14:00', '16:00');
