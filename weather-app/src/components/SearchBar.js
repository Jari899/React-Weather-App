import React from "react";

function SearchBar({ value, onChange, onSearch, loading }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Enter city, state, zip, address, or landmark"
        value={value}
        onChange={onChange}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(); }}
        disabled={loading}
      />
      <button onClick={onSearch} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
    </div>
  );
}

export default SearchBar;
