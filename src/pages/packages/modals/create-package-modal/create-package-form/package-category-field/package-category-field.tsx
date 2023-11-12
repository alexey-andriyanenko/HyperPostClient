import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Autocomplete, TextField } from "@mui/material";

import { useStore } from "src/store";
import { IOption } from "src/models";
import { useDebounce } from "src/shared/hooks";
import { useFormContext, useController } from "react-hook-form";
import { ICreatePackageForm } from "../create-package-form.types";

export const PackageCategoryField: React.FC = observer(() => {
  const { control } = useFormContext<ICreatePackageForm>();
  const { field, fieldState } = useController({
    name: "categoryId",
    control,
    rules: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
  });

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
    field.onChange(value?.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    debounce(() => {
      packageCategories.loadPackageCategories({
        ...packageCategories.filters,
        name: event.target.value,
        page: 1,
      });
    });
  };

  return (
    <Autocomplete<IOption>
      renderInput={(params) => (
        <TextField
          {...params}
          ref={field.ref}
          value={search}
          onChange={handleSearch}
          placeholder="Select Category"
          label="Package Category"
          data-testid="package-category"
          required
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
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
