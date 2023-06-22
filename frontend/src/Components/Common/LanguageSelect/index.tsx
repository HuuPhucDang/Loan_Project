import React from 'react';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import ReactSelect, {
  components,
  SingleValueProps,
  PlaceholderProps,
} from 'react-select';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Assets from '../../../Assets';

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  label?: string;
  selected: string;
  onSelect(newValue: string): void;
  sx?: object;
  placeholder?: string;
}

const languages = [
  {
    label: 'Vietnam',
    value: 'vi',
  },
  {
    label: 'English',
    value: 'en',
  },
];

const Placeholder = (props: PlaceholderProps<IOption>) => {
  return (
    <components.Placeholder {...props}>
      <Stack flexDirection="row" alignItems="center" sx={{ color: '#000' }}>
        <Box
          component="img"
          src={Assets.ballIcon}
          sx={{ width: '20px', height: '20px', marginRight: '5px' }}
        />{' '}
        {props.children}
      </Stack>
    </components.Placeholder>
  );
};

const SingleValueComponent = ({
  children,
  ...props
}: SingleValueProps<IOption>) => (
  <components.SingleValue {...props}>
    <Stack flexDirection="row" alignItems="center">
      <Box
        component="img"
        src={Assets.ballIcon}
        sx={{ width: '20px', height: '20px', marginRight: '5px' }}
      />{' '}
      {children}
    </Stack>
  </components.SingleValue>
);

const LanguageSelect: React.FC<IProps> = ({ sx = {}, placeholder = '' }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null
  );

  const handleChange = (newValue: any) => {
    setSelectedOption(newValue);
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
      <ReactSelect
        value={selectedOption}
        onChange={handleChange}
        options={languages}
        placeholder={placeholder || 'Language'}
        isSearchable={false}
        styles={{
          container: (base) => ({
            ...base,
            width: '119px',
            boxSizing: 'border-box',
            fontSize: '12px',
            fontWeight: 400,
            background: '#FFB23F',
            borderRadius: '5px',
          }),
          control: (base, props) => ({
            ...base,
            boxSizing: 'border-box',
            borderColor: '#2E2800',
            color: '#000000',
            boxShadow: props.isFocused ? '0 0 0 1px #E87844' : 'none',
            borderRadius: '5px',
            minHeight: '26px',
            border: 'none',
            background: '#FFB23F',
          }),
          valueContainer: (base) => ({
            ...base,
            boxSizing: 'border-box',
            height: '26px',
            padding: '0 6px',
          }),
          menuList: (base) => ({
            ...base,
            border: '1px solid #2E2800',
            width: 'auto',
            height: '100%',
            maxHeight: '400px',
            borderRadius: '5px',
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
            height: '27px',
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
          indicatorsContainer: (base) => ({
            ...base,
            width: '24px',
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => (
            <ExpandMoreOutlinedIcon
              sx={{ fontSize: '14px', margin: '0 6px', color: '#000000' }}
            />
          ),
          SingleValue: SingleValueComponent,
          Placeholder,
        }}
      />
    </Stack>
  );
};

export default LanguageSelect;
