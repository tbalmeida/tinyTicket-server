-- Canadian provinces
INSERT INTO provinces (name, abbreviation) VALUES
  ('Alberta', 'AB'),
  ('British Columbia', 'BC'),
  ('Manitoba', 'MN'),
  ('New Brunswick', 'NB'),
  ('Newfoundland and Labrador', 'NL'),
  ('Northwest Territories', 'NW'),
  ('Nova Scotia', 'NS'),
  ('Nunavut', 'NU'),
  ('Ontario', 'ON'),
  ('Prince Edward Island', 'PE'),
  ('Quebec', 'QC'),
  ('Saskatchewan', 'SK'),
  ('Yukon', 'YT');

  -- Cities: Calgary
INSERT INTO cities (name, province) VALUES
  SELECT 'Calgary', id FROM provinces WHERE name = 'Alberta';