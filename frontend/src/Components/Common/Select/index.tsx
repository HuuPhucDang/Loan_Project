import React from 'react';
import {
  InputLabel,
  Stack,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ReactSelect, { SingleValue } from 'react-select';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  label?: string;
  selected: string;
  options: IOption[];
  onSelect(newValue: string): void;
  sx?: object;
  placeholder?: string;
}

const labelStyles: SxProps<Theme> = {
  fontSize: '15px',
  fontWeight: 700,
  letterSpacing: '-1.5%',
  color: 'rgba(0,0,0,0.8)',
  marginRight: {
    md: '16px',
  },
  marginBottom: {
    xs: '16px',
    md: '0px',
  },
};

const Select: React.FC<IProps> = ({
  selected,
  options,
  onSelect,
  label = '',
  sx = {},
  placeholder = '',
}) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null
  );

  React.useEffect(() => {
    const findOption = options.find(
      (option: IOption) => option.value === selected
    );
    if (findOption) setSelectedOption(findOption);
  }, [selected]);

  const handleChange = (newValue: SingleValue<IOption>) => {
    if (newValue && onSelect) onSelect(newValue.value);
  };

  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      alignItems={{
        xs: 'start',
        md: 'center',
      }}
      sx={sx}
    >
      {label ? <InputLabel sx={labelStyles}>{label}</InputLabel> : null}
      <ReactSelect
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder || 'Country'}
        isSearchable={false}
        styles={{
          container: (base) => ({
            ...base,
            width: '150px',
            boxSizing: 'border-box',
            fontSize: '15px',
            fontWeight: 500,
          }),
          control: (base, props) => ({
            ...base,
            boxSizing: 'border-box',
            borderColor: '#2E2800',
            boxShadow: props.isFocused ? '0 0 0 1px #E87844' : 'none',
            borderRadius: '0px',
            minHeight: '37px',
            border: 'none',
            background: 'rgba(187, 174, 174, 0.5)'
          }),
          valueContainer: (base) => ({
            ...base,
            boxSizing: 'border-box',
            height: '37px',
            padding: '0 8px',
          }),
          menuList: (base) => ({
            ...base,
            border: '1px solid #2E2800',
            width: 'auto',
            height: '100%',
            maxHeight: '400px',
          }),
          menu: (base) => ({
            ...base,
            minWidth: '100%',
            width: 'auto',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }),
          option: (base, props) => ({
            ...base,
            width: '100%',
            whiteSpace: matchUpMd ? 'nowrap' : 'unset',
            backgroundColor: props.isSelected
              ? 'rgba(255, 221, 0, 1.0)'
              : 'white',
            color: '#000000',
            ':active': {
              backgroundColor: 'rgba(255, 221, 0, 1.0)',
            },
            ':hover': {
              backgroundColor: '#E87844',
            },
          }),
          placeholder:(base, _props) =>({
            ...base,
            color: "#000000",
            textAlign: 'center'
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => (
            <ExpandMoreOutlinedIcon sx={{ margin: '0 4px 0 0', color: "#000000" }} />
          ),
        }}
      />
    </Stack>
  );
};

export default Select;
