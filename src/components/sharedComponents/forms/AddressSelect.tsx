import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getArea,
  getCity,
  getStreet,
  TCities,
  TDivision,
  TArea,
} from "@/services/addressSelectOption";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface AddressSelectProps {
  control: any;
  setValue: any;
  watch: any;
  name: string;
  placeholder?: string;
}

const AddressSelect = ({
  control,
  setValue,
  watch,
  name,
  placeholder,
}: AddressSelectProps) => {
  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [cities, setCities] = useState<TCities[]>([]);
  const [areas, setAreas] = useState<TArea[]>([]);
  const [step, setStep] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const selectedDivision = watch("street", "");
  const selectedCity = watch("city", "");
  const selectedArea = watch("area", "");

  const displayValue =
    selectedDivision && selectedCity && selectedArea
      ? `${selectedDivision} > ${selectedCity} > ${selectedArea}`
      : selectedDivision && selectedCity
        ? `${selectedDivision} > ${selectedCity}`
        : selectedDivision
          ? `${selectedDivision}`
          : "";

  useEffect(() => {
    getStreet().then((data: TDivision[] | undefined) => {
      setDivisions(data || []);
    });
  }, []);

  const options: { value: string; label: string }[] = [];
  if (step === 0) {
    options.push(
      ...(divisions?.map((div) => ({
        value: div.id,
        label: `${div.name} (${div.bn_name})`,
      })) || []),
    );
  } else if (step === 1) {
    options.push(
      ...(cities?.map((city) => ({
        value: city.id,
        label: `${city.name} (${city.bn_name})`,
      })) || []),
    );
  } else if (step === 2) {
    options.push(
      ...(areas?.map((area) => ({
        value: area.id,
        label: `${area.name} (${area.bn_name})`,
      })) || []),
    );
  }

  const handleChange = async (value: string): Promise<void> => {
    if (step === 0) {
      const selectedDivisionObj = divisions.find((div) => div.id === value);
      setValue("street", selectedDivisionObj?.name);
      setValue("city", "");
      setValue("area", "");
      const citiesData: TCities[] | undefined = await getCity(value);
      setCities(citiesData || []);
      setStep(1);
      setOpen(true);
    } else if (step === 1) {
      const selectedCityObj = cities.find((city) => city.id === value);
      setValue("city", selectedCityObj?.name);
      setValue("area", "");
      const areasData: TArea[] | undefined = await getArea(value);
      setAreas(areasData || []);
      setStep(2);
      setOpen(true);
    } else {
      const selectedAreaObj = areas.find((area) => area.id === value);
      setValue("area", selectedAreaObj?.name);
      setStep(0);
      setOpen(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          open={open}
          onOpenChange={setOpen}
          onValueChange={(value: string) => {
            field.onChange(value);
            handleChange(value);
          }}
        >
          <SelectTrigger className="h-12">
            <SelectValue
              placeholder={placeholder || "Select street > City > Area"}
            >
              {displayValue}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default AddressSelect;
