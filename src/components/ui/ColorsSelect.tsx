import colorsOptions, { ColorsOption } from "@/data/colors";
import chroma from "chroma-js";
import { FC } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

const colorsStyles: StylesConfig<ColorsOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    minHeight: "48px",
    borderRadius: 6,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

interface ColorsSelectProps {
  value: any;
  onChange: (selected: MultiValue<ColorsOption>) => void;
}

const ColorsSelect: FC<ColorsSelectProps> = ({ value, onChange }) => {
  console.log(value);
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      defaultValue={[colorsOptions[0], colorsOptions[1]]}
      options={colorsOptions}
      styles={colorsStyles}
      value={value}
      onChange={onChange}
    />
  );
};

export default ColorsSelect;
