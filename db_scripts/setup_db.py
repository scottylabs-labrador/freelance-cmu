import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "../freelance.db")

db = sqlite3.connect(DB_FILE)
c = db.cursor()

def create_tables():
    global c

    # USERS TABLE
    c.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        job_id INTEGER,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );
    ''')

    # JOBS TABLE
    c.execute('''
    CREATE TABLE IF NOT EXISTS jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        deadline DATE NOT NULL,
        location TEXT NOT NULL,
        price_low DECIMAL NOT NULL,
        price_high DECIMAL NOT NULL,
        payment_detail TEXT NOT NULL,
        time_commitment DECIMAL(10, 2),
        tag_id INTEGER,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
    ''')

    # TAGS TABLE
    c.execute('''
    CREATE TABLE IF NOT EXISTS tags(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE COLLATE NOCASE
    );
    ''')

    tags_list = [
        "Pick up / Delivery",
        "Tutoring",
        "Art / Design",
        "Other",
        "On campus",
        "Off campus",
        "In-person",
        "Digital"
    ]

    for tag in tags_list:
        try:
            c.execute("INSERT INTO tags (title) VALUES (?)", (tag,))
        except sqlite3.IntegrityError:
            print(f"Tag '{tag}' already exists in the database.")

create_tables()

db.commit()
db.close()
