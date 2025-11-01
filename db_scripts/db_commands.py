import sqlite3, requests
from db_scripts import setup_db
from datetime import datetime
from typing import Optional


def get_db_connection():
    return sqlite3.connect(setup_db.DB_FILE)


def clear_table(table: str):
    db = get_db_connection()
    cur = db.cursor()
    try:
        cur.execute(f"DELETE FROM {table};")
        cur.execute(f'DELETE FROM sqlite_sequence WHERE name="{table}";')
        db.commit()
    except sqlite3.Error as e:
        print(f"ERROR: {e}")
    finally:
        cur.close()
        db.close()


def add_account(username: str, password: str, email: str):
    try:
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            (username, password, email),
        )
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        cur.close()
        db.commit()
        db.close()


def get_user(column, value):
    db = get_db_connection()
    cur = db.cursor()
    try:
        query = f"SELECT * FROM users WHERE {column} = ?"
        cur.execute(query, (value,))
        user = cur.fetchone()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        user = None
    finally:
        cur.close()
        db.commit()
        db.close()
    return user


def add_job(job_name: str, 
            description: str,
            deadline: datetime,
            location: str,
            price_low: float,
            price_high: float,
            payment_detail: str,
            tag_id: int,
            username: str,
            time_commitment: Optional[str] = ''):
    try:
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            '''INSERT INTO jobs (job_name, description, deadline, location, price_low, price_high, 
                                 payment_detail, tag_id, username, time_commitment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            (job_name, description, deadline, location, price_low, price_high, payment_detail, tag_id, username, time_commitment),
        )
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        cur.close()
        db.commit()
        db.close()


def get_job(column, value):
    db = get_db_connection()
    cur = db.cursor()
    try:
        query = f"SELECT * FROM jobs WHERE {column} = ?"
        cur.execute(query, (value,))
        job = cur.fetchone()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        job = None
    finally:
        cur.close()
        db.commit()
        db.close()
    return job

def remove_job(username: str, job_name: str):
    db = get_db_connection()
    cur = db.cursor()

    cur.execute(
        "DELETE FROM jobs WHERE username = ? AND job_name = ?", (username, job_name)
    )

    db.commit()
    cur.close()
    db.close()