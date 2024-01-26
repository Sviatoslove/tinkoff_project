import { FormControl, FormErrorMessage, Input, Text } from '@chakra-ui/react';

interface ITextfieldProps {
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder?: string;
  selectCategory: string;
}

const TextField = ({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  selectCategory,
}: ITextfieldProps) => {
  const cleanInput = (e: React.MouseEvent) => {
    const target: any = e.target;
    if (value === '0') target.value = '';
  };
  return (
    <>
      <FormControl
        isInvalid={name === 'category' ? !selectCategory && !!error : !!error}
        mt={2}
      >
        <Text>{label}</Text>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onClick={cleanInput}
          size="sm"
          placeholder={
            name === 'category' && selectCategory
              ? 'Вы выбрали уже созданную категорию'
              : placeholder
          }
          isDisabled={name === 'category' && !!selectCategory}
        />
        {!!error && (
          <FormErrorMessage mb={2} mt={0}>
            {error}
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default TextField;
