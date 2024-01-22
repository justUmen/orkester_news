import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); //searchTerm  is local state, need to syn it with redux

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${encodeURIComponent(searchTerm)}`); // fix spaces /mac%20os
    onSearch(); // Invoke callback (closeSideMenu() on <LeftSideMenu /> after new route is pushed)
  };

  return (
    <>
      <form
        onSubmit={handleSearchSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ flexGrow: 1, backgroundColor: "white" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" color="primary" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </>
  );
};

export default SearchBar;
