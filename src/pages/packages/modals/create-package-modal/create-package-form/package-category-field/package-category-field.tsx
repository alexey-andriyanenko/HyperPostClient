import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "src/store";
import { IOption } from "src/models/option";
import { useDebounce } from "src/shared/hooks";

export const PackageCategoryField: React.FC = observer(() => {
  const packageCategories = useStore("packageCategories");
  const debounce = useDebounce(300);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState<IOption | null>(null);

  const options: IOption[] = packageCategories.packageCategories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {
    packageCategories.loadPackageCategories(packageCategories.filters);
  }, []);

  const handleOptionsScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement;

    if (scrollHeight - scrollTop === clientHeight) {
      packageCategories.loadPackageCategories({
        ...packageCategories.filters,
        page: packageCategories.filters.page + 1,
      });
    }
  };

  const handleOptionChange = (_: React.SyntheticEvent, value: IOption | null) => {
    setSearch("");
    setOption(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    debounce(() => {
      packageCategories.loadPackageCategories({
        ...packageCategories.filters,
        name: event.target.value,
      });
    });
  };

  return (
    <Autocomplete<IOption>
      renderInput={(params) => (
        <TextField
          {...params}
          value={search}
          onChange={handleSearch}
          placeholder="Select Category"
          label="Package Category"
          data-testid="package-category"
          required
        />
      )}
      options={options}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={option}
      onChange={handleOptionChange}
      componentsProps={{
        paper: {
          onScroll: handleOptionsScroll,
        },
      }}
    />
  );
});
