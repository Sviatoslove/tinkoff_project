import { Select } from '@chakra-ui/react';
import { EventChange, ICategories } from '../../../../models';
import { TriangleDownIcon } from '@chakra-ui/icons';

interface ISelectFieldProps {
  id?:any
  name: string;
  value: string;
  label: string;
  error: string;
  placeholder: string;
  onChange: (e: EventChange, field?:string) => void;

  defaultOption?: ICategories;
  options: ICategories[] | null | undefined;
  category: string;
  size: string;
  onClick?: (e:any) => void
}

const SelectedField = ({
  id,
  name,
  value,
  label,
  error,
  onChange,
  options,
  placeholder,
  category,
  size,
  onClick
}: ISelectFieldProps) => {
  const optionsArray = options
    ? Object.values(options)?.map((optionName) => ({
        name: optionName.name,
        value: optionName.id,
      }))
    : [];

  return (
    <div className="mb-2 d-flex flex-column">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Select
        icon={<TriangleDownIcon />}
        size={size}
        placeholder={
          category
            ? 'Вы создаёте категорию'
            : !options
            ? 'У вас нет категорий'
            : placeholder
        }
        value={value}
        onChange={onChange}
        onClick={onClick}
        name={name}
        id={id || name}
        disabled={!options || !!category}
        w={'100%'}

      >
        {optionsArray?.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          );
        })}
      </Select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectedField;
