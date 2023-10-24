import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "src/store";
import { IOption } from "src/models/option";

export interface IDepartmentFieldProps {
  label: string;
  placeholder: string;
  "data-testid": string;
}

export const DepartmentField = observer<IDepartmentFieldProps>(
  ({ label, placeholder, "data-testid": testId }) => {
    const departments = useStore("departments");
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

    return (
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            data-testid={testId}
            required
          />
        )}
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
