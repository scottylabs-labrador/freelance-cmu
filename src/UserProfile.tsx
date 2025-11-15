import React, { useState, useEffect, ChangeEvent } from "react";

// ---------- USER INTERFACE ----------
interface Bank {
  accountNumber: string;
  routingNumber: string;
  name?: string;
}

interface User {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  schedule?: boolean[][];
  bank?: Bank[];
}

// ---------- CONSTANTS ----------
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ---------- SIGN-IN COMPONENT ----------
const SignIn: React.FC<{ onSignIn: (email: string) => void }> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSignIn(email.trim().toLowerCase());
  };

  return (
    <div style={styles.container}>
      <h2>Welcome</h2>
      <p>Sign in to continue</p>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

// ---------- SCHEDULE COMPONENT ----------
interface ScheduleProps {
  userEmail: string;
  schedule: boolean[][];
  setSchedule: (s: boolean[][]) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ userEmail, schedule, setSchedule }) => {
  const toggleHour = (dayIdx: number, hourIdx: number) => {
    const updated = schedule.map((day, d) =>
      d === dayIdx ? day.map((h, i) => (i === hourIdx ? !h : h)) : day
    );
    setSchedule(updated);

    const profiles: User[] = JSON.parse(localStorage.getItem("profiles") || "[]");
    const updatedProfiles = profiles.map((p) =>
      p.email === userEmail ? { ...p, schedule: updated } : p
    );
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
  };

  return (
    <div style={styles.scheduleContainer}>
      <h3>Weekly Schedule</h3>
      <div style={styles.scheduleGrid}>
        <div style={styles.headerRow}>
          <div style={styles.headerCell}></div>
          {DAYS.map((day) => (
            <div key={day} style={styles.headerCell}>
              {day}
            </div>
          ))}
        </div>
        {HOURS.map((hour) => (
          <div key={hour} style={styles.row}>
            <div style={styles.hourLabel}>{`${hour}:00`}</div>
            {DAYS.map((_, dIdx) => (
              <div
                key={dIdx}
                style={{
                  ...styles.cell,
                  backgroundColor: schedule[dIdx][hour] ? "#841f1fff" : "#f2f2f2",
                  cursor: "pointer",
                }}
                onClick={() => toggleHour(dIdx, hour)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- BANK INFO COMPONENT ----------
interface BankProps {
  userEmail: string;
  bank: Bank[];
  setBank: (b: Bank[]) => void;
}

const BankInfo: React.FC<BankProps> = ({ userEmail, bank, setBank }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [currentBank, setCurrentBank] = useState<Bank>(
    bank && bank.length > 0 ? bank[0] : { accountNumber: "", routingNumber: "", name: "Account 1" }
  );

  useEffect(() => {
    if (!Array.isArray(bank) || bank.length === 0) {
      const newBank = [{ accountNumber: "", routingNumber: "", name: "Account 1" }];
      setBank(newBank);
      setSelectedIdx(0);
      setCurrentBank(newBank[0]);
    } else {
      setCurrentBank(bank[selectedIdx] || bank[0]);
    }
  }, [selectedIdx, bank, setBank]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentBank({ ...currentBank, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedBanks = [...(Array.isArray(bank) ? bank : [])];
    updatedBanks[selectedIdx] = currentBank;
    setBank(updatedBanks);

    const profiles: User[] = JSON.parse(localStorage.getItem("profiles") || "[]");
    const updatedProfiles = profiles.map((p) =>
      p.email === userEmail ? { ...p, bank: updatedBanks } : p
    );
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
    alert("Bank info saved!");
  };

  const handleAddBank = () => {
    const newBank = { accountNumber: "", routingNumber: "", name: `Account ${bank.length + 1}` };
    const updatedBanks = [...(Array.isArray(bank) ? bank : []), newBank];
    setBank(updatedBanks);
    setSelectedIdx(updatedBanks.length - 1);
  };

  const handleDeleteBank = () => {
    if (!window.confirm("Are you sure you want to delete this bank account?")) return;
    const updatedBanks = bank.filter((_, i) => i !== selectedIdx);
    setBank(updatedBanks);
    setSelectedIdx(Math.max(0, selectedIdx - 1));

    const profiles: User[] = JSON.parse(localStorage.getItem("profiles") || "[]");
    const updatedProfiles = profiles.map((p) =>
      p.email === userEmail ? { ...p, bank: updatedBanks } : p
    );
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
  };

  return (
    <div style={styles.container}>
      <h3>Bank Information</h3>

      <div style={{ marginBottom: "1rem" }}>
        {(Array.isArray(bank) ? bank : []).map((b, idx) => (
          <button
            key={idx}
            style={{
              ...styles.tabButton,
              marginRight: "0.5rem",
              background: selectedIdx === idx ? "#841f1fff" : "#aaa",
            }}
            onClick={() => setSelectedIdx(idx)}
          >
            {b.name || `Account ${idx + 1}`}
          </button>
        ))}
        <button style={styles.tabButton} onClick={handleAddBank}>
          + Add
        </button>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Account Name</label>
        <input
          style={styles.input}
          name="name"
          value={currentBank?.name || ""}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Account Number</label>
        <input
          style={styles.input}
          name="accountNumber"
          value={currentBank?.accountNumber || ""}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Routing Number</label>
        <input
          style={styles.input}
          name="routingNumber"
          value={currentBank?.routingNumber || ""}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button style={styles.button} onClick={handleSave}>
          Save Bank Account
        </button>
        <button
          style={{ ...styles.button, background: "#841f1fff" }}
          onClick={handleDeleteBank}
        >
          Delete Bank Account
        </button>
      </div>
    </div>
  );
};


// ---------- USER PROFILE COMPONENT ----------
const UserProfile: React.FC<{ userEmail: string; onSignOut: () => void }> = ({ userEmail, onSignOut }) => {
  const [profiles, setProfiles] = useState<User[]>(() => {
    const saved = localStorage.getItem("profiles");
    return saved ? JSON.parse(saved) : [];
  });

  const existingUser =
    profiles.find((p) => p.email === userEmail) ||
    ({
      name: "New User",
      email: userEmail,
      bio: "Fill in bio here",
      avatar:
        "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg",
      schedule: Array(7)
        .fill(null)
        .map(() => Array(24).fill(false)),
      bank: [{ accountNumber: "", routingNumber: "" }],
    } as User);

  const [user, setUser] = useState<User>(existingUser);
  const [form, setForm] = useState<User>(existingUser);
  const [schedule, setSchedule] = useState<boolean[][]>(existingUser.schedule || []);
  const [bank, setBank] = useState<Bank[]>(
    Array.isArray(existingUser.bank) && existingUser.bank.length > 0
      ? existingUser.bank
      : [{ accountNumber: "", routingNumber: "" }]
  );
  const [activeTab, setActiveTab] = useState<"profile" | "schedule" | "bank">("profile");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, avatar: imageUrl });
    }
  };

  const handleSaveProfile = () => {
    setUser(form);
    const idx = profiles.findIndex((p) => p.email === form.email);
    const updatedProfiles = [...profiles];
    if (idx !== -1) updatedProfiles[idx] = { ...form, schedule, bank };
    else updatedProfiles.push({ ...form, schedule, bank });
    setProfiles(updatedProfiles);
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
    alert("Profile saved!");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={styles.sidebar}>
        <h2>User Menu</h2>
        <button style={styles.tabButton} onClick={() => setActiveTab("profile")}>Profile</button>
        <button style={styles.tabButton} onClick={() => setActiveTab("schedule")}>Schedule</button>
        <button style={styles.tabButton} onClick={() => setActiveTab("bank")}>Bank Info</button>
        <button style={{ ...styles.tabButton, marginTop: "auto", background: "#555" }} onClick={onSignOut}>Sign Out</button>
      </div>

      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {activeTab === "profile" && (
          <div>
            <img src={form.avatar} alt="avatar" style={styles.avatar} />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input style={styles.input} name="name" value={form.name} onChange={handleChange} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} name="email" value={form.email} disabled />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Bio</label>
              <textarea style={styles.textarea} name="bio" value={form.bio} onChange={handleChange} />
            </div>
            <button style={styles.button} onClick={handleSaveProfile}>Save Profile</button>
          </div>
        )}

        {activeTab === "schedule" && <Schedule userEmail={user.email} schedule={schedule} setSchedule={setSchedule} />}
        {activeTab === "bank" && <BankInfo userEmail={user.email} bank={bank} setBank={setBank} />}
      </div>
    </div>
  );
};

// ---------- ROOT APP ----------
const App: React.FC = () => {
  const [signedInEmail, setSignedInEmail] = useState<string | null>(localStorage.getItem("currentUser"));

  const handleSignIn = (email: string) => {
    setSignedInEmail(email);
    localStorage.setItem("currentUser", email);
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setSignedInEmail(null);
  };

  return signedInEmail ? <UserProfile userEmail={signedInEmail} onSignOut={handleSignOut} /> : <SignIn onSignIn={handleSignIn} />;
};

// ---------- STYLES ----------
const styles: { [key: string]: React.CSSProperties } = {
  sidebar: { width: "200px", background: "#f8f8f8", padding: "1rem", display: "flex", flexDirection: "column" },
  tabButton: { padding: "0.5rem 1rem", marginBottom: "1rem", cursor: "pointer", border: "none", borderRadius: "0.25rem", background: "#841f1fff", color: "#fff", fontSize: "1rem" },
  container: { padding: "1rem", textAlign: "center" },
  avatar: { width: 120, height: 120, borderRadius: "50%", marginBottom: "1rem", objectFit: "cover" },
  field: { textAlign: "left", marginBottom: "1rem" },
  label: { display: "block", marginBottom: "0.25rem", fontWeight: 500 },
  input: { display: "block", width: "100%", margin: "0.5rem 0", padding: "0.5rem", fontSize: "1rem", borderRadius: "0.5rem", border: "1px solid #ddd" },
  textarea: { display: "block", width: "100%", height: "80px", margin: "0.5rem 0", padding: "0.5rem", fontSize: "1rem", borderRadius: "0.5rem", border: "1px solid #ddd" },
  button: { marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem", background: "#841f1fff", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer" },
  scheduleContainer: { marginTop: "1rem" },
  scheduleGrid: { display: "grid", gridTemplateColumns: "80px repeat(7, 1fr)", overflowX: "auto" },
  headerRow: { display: "contents" },
  headerCell: { textAlign: "center", fontWeight: 600, padding: "5px" },
  row: { display: "contents" },
  hourLabel: { textAlign: "center", padding: "5px", borderBottom: "1px solid #ddd" },
  cell: { width: "100%", height: "25px", border: "1px solid #ddd" },
};

export default App;
