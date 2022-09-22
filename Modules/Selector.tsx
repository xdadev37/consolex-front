import { memo } from 'react';
import {
  Autocomplete,
  TextField,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  Popper,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import sx from 'TSS/Text.module';
import sxSelector from 'TSS/Selector.module';
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import type { PopperProps } from '@mui/material/Popper';
import type { FC, HTMLAttributes } from 'react';
import type { ISelectors } from 'Types/Selectors';

const Selectors: FC<ISelectors> = ({
  options,
  multiple,
  onChange,
  hintText,
  placeholder,
  value,
  disabled,
  optionLabel,
  reverseFlexDirection,
  ...selectProps
}) => {
  const MultiPopper = (props: PopperProps) => (
    <Popper {...props} placement="left" />
  );
  const getOptionLabel = (option: any) => option[optionLabel];
  const renderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    option: any,
    { selected }: Record<'selected', boolean>
  ) => (
    <ListItem divider {...props}>
      <ListItemButton disableRipple disableTouchRipple sx={sxSelector.options}>
        <Checkbox checked={selected} />
      </ListItemButton>
      <ListItemText>{option[optionLabel]}</ListItemText>
    </ListItem>
  );
  const renderInput = (props: AutocompleteRenderInputParams) => (
    <TextField
      {...props}
      sx={
        !reverseFlexDirection
          ? sx.root
          : {
              ...sx.root,
              '.MuiAutocomplete-input': {
                direction: 'rtl',
                fontFamily: 'sans-serif !important',
              },
            }
      }
      helperText={hintText}
      label={placeholder}
    />
  );

  return (
    <Autocomplete
      {...selectProps}
      {...{
        options,
        renderInput,
        value,
        multiple,
        disabled,
        getOptionLabel,
      }}
      fullWidth
      freeSolo
      disableClearable
      forcePopupIcon
      sx={sxSelector.adornment}
      componentsProps={{
        popper: { sx: sxSelector.popper },
        paper: {
          sx: !reverseFlexDirection
            ? sxSelector.paper
            : {
                ...sxSelector.paper,
                '& > ul > li': {
                  flexDirection: 'row-reverse',
                  fontFamily: 'sans-serif !important',
                },
              },
        },
      }}
      filterOptions={options.length > 15 ? undefined : (filter) => filter}
      PopperComponent={multiple ? MultiPopper : undefined}
      popupIcon={<FontAwesomeIcon icon={faChevronDown} color="#0e5691" />}
      disableCloseOnSelect={multiple}
      renderOption={multiple ? renderOption : undefined}
      noOptionsText="موردی جهت نمایش وجود ندارد"
      onChange={(e, valueSel: Record<string, any> | Record<string, any>[]) =>
        valueSel !== value ? onChange(valueSel) : undefined
      }
    />
  );
};

export default memo(
  Selectors,
  (prev, next) =>
    prev.options.length === next.options.length &&
    prev.value === next.value &&
    prev.disabled === next.disabled
);
