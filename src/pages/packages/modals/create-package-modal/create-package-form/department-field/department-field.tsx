import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "src/store";
import { IOption } from "src/models";
import { useDebounce } from "src/shared/hooks";

export interface IDepartmentFieldProps {
  label: string;
  placeholder: string;
  "data-testid": string;
}

export const DepartmentField = observer<IDepartmentFieldProps>(
  ({ label, placeholder, "data-testid": testId }) => {
    const debounce = useDebounce(300);
    const departments = useStore("departments");
    const [search, setSearch] = useState("");
    const [option, setOption] = useState<IOption | null>(null);

    const options: IOption[] = departments.departments.map((department) => ({
      label: `#${department.number} - ${department.fullAddress}`,
      value: department.id,
    }));

    useEffect(() => {
      departments.loadDepartments(departments.filters);
    }, []);

    const handleOptionsScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement;

      if (scrollHeight - scrollTop === clientHeight) {
        departments.loadDepartments({
          ...departments.filters,
          page: departments.filters.page + 1,
        });
      }
    };

    const handleOptionChange = (_: React.SyntheticEvent, value: IOption | null) => {
      setOption(value);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);

      debounce(() => {
        departments.loadDepartments({
          ...departments.filters,
          address: event.target.value,
          page: 1,
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
            label={label}
            placeholder={placeholder}
            data-testid={testId}
            required
          />
        )}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        options={options}
        value={option}
        onChange={handleOptionChange}
        componentsProps={{
          paper: {
            onScroll: handleOptionsScroll,
          },
        }}
        fullWidth
      />
    );
  },
);
