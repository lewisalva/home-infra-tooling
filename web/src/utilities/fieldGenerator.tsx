import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import * as dayjs from 'dayjs';

export enum FieldType {
  string = 'string',
  number = 'number',
  text = 'text',
  date = 'date',
  select = 'select',
}

export type GenericField<T = string> = {
  name: T;
  label: string;
  defaultValue: string;
  type: FieldType.text | FieldType.date | FieldType.string | FieldType.number;
  placeholder?: string;
  disabled?: boolean;
};

export type SelectField<T = string> = Pick<
  GenericField<T>,
  'name' | 'label' | 'defaultValue' | 'disabled'
> & {
  type: FieldType.select;
  options: string[];
};

export type Field<T = string> = GenericField<T> | SelectField<T>;

export type Fields<T = string> = Field<T>[];

export const fieldGenerator = (field: Field) => {
  if (field.type === FieldType.select) {
    return (
      <FormControl fullWidth margin="normal" key={field.name}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          key={field.name}
          required
          id={field.name}
          label={field.label}
          name={field.name}
          defaultValue={field.defaultValue}
          inputProps={{ sx: { textTransform: 'capitalize' } }}
          disabled={field.disabled}
        >
          {field.options.map((option) => (
            <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (field.type === FieldType.date) {
    return (
      <DatePicker
        sx={{ mt: 2, mb: 1, width: '100%' }}
        key={field.name}
        label={field.label}
        name={field.name}
        defaultValue={dayjs(field.defaultValue)}
        disabled={field.disabled}
      />
    );
  }
  return (
    <TextField
      key={field.name}
      margin="normal"
      required
      fullWidth
      type={field.type === FieldType.string ? 'text' : field.type}
      multiline={field.type === FieldType.text}
      minRows={3}
      id={field.name}
      label={field.label}
      name={field.name}
      defaultValue={field.defaultValue}
      placeholder={field.placeholder}
      disabled={field.disabled}
    />
  );
};
