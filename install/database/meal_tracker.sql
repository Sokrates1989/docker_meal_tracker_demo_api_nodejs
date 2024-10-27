-- Create the users table
CREATE TABLE users (
    ID BIGSERIAL PRIMARY KEY,
    name TEXT,
    hashedPassword TEXT
);

-- Create the days table
CREATE TABLE days (
    ID BIGSERIAL PRIMARY KEY,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL
);

-- Create the meal_types table
CREATE TABLE meal_types (
    ID BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Insert the predefined meal types (breakfast, lunch, dinner, snacks)
INSERT INTO meal_types (name) VALUES
('breakfast'),
('lunch'),
('dinner'),
('snacks');

-- Create the meals table
CREATE TABLE meals (
    ID BIGSERIAL PRIMARY KEY,
    fat_level INT NOT NULL,  -- 0: Low, 1: Medium, 2: High
    sugar_level INT NOT NULL  -- 0: Low, 1: Medium, 2: High
);

-- Create the day_meals table with composite primary key
CREATE TABLE day_meals (
    fk_user_id BIGINT NOT NULL REFERENCES users(ID) ON DELETE CASCADE,
    fk_day_id BIGINT NOT NULL REFERENCES days(ID) ON DELETE CASCADE,
    fk_meal_type_id BIGINT NOT NULL REFERENCES meal_types(ID) ON DELETE CASCADE,
    fk_meal_id BIGINT NOT NULL REFERENCES meals(ID) ON DELETE CASCADE,
    PRIMARY KEY (fk_user_id, fk_day_id, fk_meal_type_id)
);
