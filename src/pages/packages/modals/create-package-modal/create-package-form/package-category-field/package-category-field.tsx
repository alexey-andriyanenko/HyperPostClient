import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "src/store";
import { IOption } from "src/models/option";

export const PackageCategoryField: React.FC = observer(() => {
  const packageCategories = useStore("packageCategories");
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
    setOption(value);
  };

  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select Category"
          label="Package Category"
          data-testid="package-category"
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
    />
  );
});
