CREATE DATABASE vmv;

\c vmv

CREATE TABLE
    users (
        user_id SERIAL NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(16) NOT NULL,
        name VARCHAR(255),
        birthday DATE,
        emergency_contact_name VARCHAR(255),
        emergency_contact_phone VARCHAR(255),
        facebook_link VARCHAR(255),
        instagram_link VARCHAR(255),
        tiktok_link VARCHAR(255),
        photo_url VARCHAR(255),
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        PRIMARY KEY (user_id)
    );

CREATE TABLE
    user_exercise_recordings (
        recording_id SERIAL NOT NULL,
        user_id INT NOT NULL,
        exercise_id INT NOT NULL,
        recording_url VARCHAR(255),
        created_at TIMESTAMP,
        PRIMARY KEY (recording_id)
    );

CREATE TABLE
    exercises (
        exercise_id SERIAL NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        video_url VARCHAR(255) NOT NULL,
        PRIMARY KEY (exercise_id)
    );

CREATE TABLE
    user_songs (
        song_id SERIAL NOT NULL,
        user_id INT NOT NULL,
        song_title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        is_practicing BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL,
        recording_url VARCHAR(255),
        PRIMARY KEY (song_id)
    );

CREATE TABLE
    payments (
        payment_id SERIAL NOT NULL,
        user_id INT NOT NULL,
        lesson_id INT NOT NULL,
        package_id INT NOT NULL,
        amount_paid DECIMAL NOT NULL,
        payment_method VARCHAR(255) NOT NULL,
        payment_date DATE NOT NULL,
        PRIMARY KEY (payment_id)
    );

CREATE TABLE
    lessons (
        lesson_id SERIAL NOT NULL,
        user_id INT NOT NULL,
        booked_at TIMESTAMP NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        paid BOOLEAN NOT NULL,
        payment_id INT,
        proof_payment_url VARCHAR(255),
        package_id INT,
        PRIMARY KEY (lesson_id)
    );

CREATE TABLE
    packages (
        package_id SERIAL NOT NULL,
        user_id INT NOT NULL,
        paid BOOLEAN NOT NULL,
        payment_id INT NOT NULL,
        total_lessons INT NOT NULL,
        lessons_left INT NOT NULL,
        expiration_date DATE NOT NULL,
        PRIMARY KEY (package_id)
    );

CREATE TABLE
    comments (
        comment_id SERIAL NOT NULL,
        user_id INT NOT NULL,
        exercise_id INT NOT NULL,
        comment VARCHAR(2000) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (comment_id)
    );

ALTER TABLE user_exercise_recordings ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
ADD CONSTRAINT fk_exercise FOREIGN KEY (exercise_id) REFERENCES exercises (exercise_id);

ALTER TABLE user_songs ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE payments ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
ADD CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id),
ADD CONSTRAINT fk_package FOREIGN KEY (package_id) REFERENCES packages (package_id);

ALTER TABLE lessons ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
ADD CONSTRAINT fk_payment FOREIGN KEY (payment_id) REFERENCES payments (payment_id),
ADD CONSTRAINT fk_package FOREIGN KEY (package_id) REFERENCES packages (package_id);

ALTER TABLE packages ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
ADD CONSTRAINT fk_payment FOREIGN KEY (payment_id) REFERENCES payments (payment_id);

ALTER TABLE comments ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
ADD CONSTRAINT fk_exercise FOREIGN KEY (exercise_id) REFERENCES exercises (exercise_id);