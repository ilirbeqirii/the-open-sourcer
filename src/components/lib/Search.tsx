/** @jsxImportSource @emotion/react */

import { Input } from "antd";
import { ChangeEvent, FormEvent } from "react";

type SearchProps = {
  handleSearch: (query: string) => void;
  [key: string]: unknown;
};

function Search({ handleSearch, ...props }: SearchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.trim()) {
      handleSearch("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query: string = (
      (event.target as HTMLFormElement).elements.namedItem(
        "search"
      ) as HTMLInputElement
    ).value;

    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        allowClear
        id="search"
        placeholder="Search here..."
        onChange={handleChange}
        css={{ boxShadow: "0px 0px 10px 1px #bebebe" }}
        {...props}
      />
    </form>
  );
}

export { Search };
