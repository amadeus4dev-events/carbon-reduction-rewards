import { useState } from "react";
import { useController } from "react-hook-form";
import { Combobox as BaseCombobox } from "@headlessui/react";

export type ComboboxProps<T, N extends string> = {
  options: T[];
  displayValue: (val: T) => string;
  getKey: (val: T) => string;
  name: N;
};

const Combobox = <T, N extends string = string>({
  options,
  displayValue,
  getKey,
  name,
}: ComboboxProps<T, N>) => {
  // const [selectedOption, setSelectedOption] = useState(options[0]);
  const {
    field: { value, onChange, onBlur },
  } = useController({ name });
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return displayValue(option)
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <div className="dropdown">
      <BaseCombobox value={value} onChange={onChange}>
        <BaseCombobox.Input
          type="text"
          onBlur={onBlur}
          className="input input-bordered w-full max-w-xs"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={displayValue}
        />
        <BaseCombobox.Options className="dropdown-content menu p-2 shadow-xl bg-base-100 w-56 ">
          {filteredOptions.map((option) => (
            <BaseCombobox.Option
              key={getKey(option)}
              value={option}
              className="px-4 py-4 cursor-pointer hover:bg-slate-200"
            >
              {displayValue(option)}
            </BaseCombobox.Option>
          ))}
        </BaseCombobox.Options>
      </BaseCombobox>
    </div>
  );
};

export default Combobox;
