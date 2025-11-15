import React from "react";
import UserProfile from "./UserProfile";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <h1 style={styles.topBarTitle}>Freelance CMU</h1>
      </div>

      {/* Centered profile */}
      <div style={styles.center}>
        <UserProfile />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  topBar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#5b1515ff",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky", // stays on top when scrolling
    top: 0,
    zIndex: 100,
  },
  topBarTitle: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 60px)", // subtract top bar height
  },
};

export default App;
