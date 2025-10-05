import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { registerPlugin } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { Edit, Plus, X } from "lucide-react";
import React from "react";
import { FilePond } from "react-filepond";
import {
  ControllerRenderProps,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import ReactSelect from "react-select";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// const existings = [
//   "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
//   "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
//   "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
// ];

interface FormFieldProps {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "select"
    | "multiple-select"
    | "switch"
    | "password"
    | "file"
    | "fileOne"
    | "fileUpdate"
    | "multi-input";
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string;
  disabled?: boolean;
  multiple?: boolean;
  isIcon?: boolean;
  initialValue?: string | number | boolean | string[];
  // existingsUrls: string[];
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  // existingsUrls,
  label,
  type = "text",
  placeholder,
  options,
  // accept,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  // multiple = false,
  isIcon = false,
  initialValue,
}) => {
  const { control } = useFormContext();

  const renderFormControl = (
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            {...field}
            rows={3}
            className={`border-gray-200 p-4 ${inputClassName}`}
          />
        );
      case "select":
        return (
          <Select
            value={field.value || (initialValue as string)}
            defaultValue={field.value || (initialValue as string)}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              className={`w-full border-gray-200 p-4 ${inputClassName}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full border-gray-200 shadow">
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={`cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multiple-select":
        return (
          <ReactSelect
            isMulti
            options={options}
            value={options?.filter((opt) => field.value?.includes(opt.value))}
            onChange={(selected) => {
              const values = selected.map((s) => s.value);
              field.onChange(values);
            }}
            placeholder={null}
            className="w-full text-sm "
            classNamePrefix="custom-select"
            styles={{
              control: (base) => ({
                ...base,
                lineHeight: 1,
                borderColor: "#e5e7eb",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#e5e7eb",
                },
              }),

              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? "#f3f4f6" : "white",
                cursor: "pointer",
                height: "30px",

                display: "flex",
                alignItems: "center",
              }),

              multiValue: (base) => ({
                ...base,
                color: "#444",
                backgroundColor: "#f1f0ef",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "black",
                fontSize: "0.875rem",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#4338ca",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#c7d2fe",
                  color: "#3730a3",
                },
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#f3f4f6", // hover background
                primary: "#f3f4f6", // selected background (this removes the blue)
              },
            })}
          />
        );
      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              className={`text-customgreys-dirtyGrey ${inputClassName}`}
            />
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
          </div>
        );
      // case "fileUpdate":
      //   return (
      //     <FilePond
      //       className={`${inputClassName}`}
      //       files={
      //         existingsUrls?.length
      //           ? existingsUrls.map((url) => ({
      //               source: url,
      //               options: {
      //                 type: "remote",
      //               },
      //             }))
      //           : []
      //       } // Ensure files are shown if existingsUrls is not empty
      //       allowMultiple={true}
      //       labelIdle={`Drag & Drop your images or <span class="filepond--label-action">Browse</span>`}
      //       credits={false}
      //     />
      //   );

      case "file":
        return (
          <FilePond
            className={`${inputClassName}`}
            onupdatefiles={(fileItems) => {
              const files = fileItems.map((fileItem) => fileItem.file);
              field.onChange(files);
            }}
            allowMultiple={true}
            labelIdle={`Drag & Drop your images or <span class="filepond--label-action">Browse</span>`}
            credits={false}
          />
        );
      case "fileOne":
        return (
          <FilePond
            onupdatefiles={(fileItems) => {
              const files = fileItems.map((fileItem) => fileItem.file);
              field.onChange(files[0]); // Single file only
            }}
            allowMultiple={false}
            labelIdle={`Drag & Drop your images or <span class="filepond--label-action">Browse</span>`}
            credits={false}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            {...field}
            className={`border-gray-200 p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
      case "multi-input":
        return (
          <MultiInputField
            name={name}
            control={control}
            placeholder={placeholder}
            inputClassName={inputClassName}
          />
        );
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className={`border-gray-200 p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormItem
          className={`${
            type !== "switch" && "rounded-md"
          } relative ${className}`}
        >
          {type !== "switch" && (
            <div className="flex justify-between items-center">
              <FormLabel className={`text-sm ${labelClassName}`}>
                {label}
              </FormLabel>

              {!disabled &&
                isIcon &&
                type !== "file" &&
                type !== "multi-input" && (
                  <Edit className="size-4 text-customgreys-dirtyGrey" />
                )}
            </div>
          )}
          <FormControl>
            {renderFormControl({
              ...field,
              value: field.value !== undefined ? field.value : initialValue,
            })}
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};
interface MultiInputFieldProps {
  name: string;
  control: any;
  placeholder?: string;
  inputClassName?: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  control,
  placeholder,
  inputClassName,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <FormField
            control={control}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={`flex-1 border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                />
              </FormControl>
            )}
          />
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="ghost"
            size="icon"
            className="text-customgreys-dirtyGrey"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append("")}
        variant="outline"
        size="sm"
        className="mt-2 text-customgreys-dirtyGrey"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};
