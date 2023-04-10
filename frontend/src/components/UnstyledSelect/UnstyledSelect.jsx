import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';


const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    defaultListboxOpen: PropTypes.bool,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool.isRequired,
    focusVisible: PropTypes.bool.isRequired,
    getSerializedValue: PropTypes.func,
    listboxId: PropTypes.string,
    listboxOpen: PropTypes.bool,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onListboxOpenChange: PropTypes.func,
    open: PropTypes.bool.isRequired,
    optionStringifier: PropTypes.func,
    renderValue: PropTypes.func,
    slotProps: PropTypes.shape({
      listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    }),
    slots: PropTypes.shape({
      listbox: PropTypes.elementType,
      popper: PropTypes.func,
      root: PropTypes.elementType,
    }),
    value: PropTypes.any,
  }).isRequired,
};

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: montserrat, sans-serif;
  font-size: 1.4rem;
  box-sizing: border-box;
  height: 4rem;
  width:100%;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
  line-height: 1.5;
  background: #F8FFFF;
  border:#0D7377 1px dotted;
  color: #212121;
  position: relative;
  cursor:pointer;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: #A7DBD5;
    border-color:black;
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${'#A7DBD5'};
    outline: 3px solid #A7DBD5;
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: montserrat, sans-serif;
  font-size: 1.4rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: white;
  color: #212121;
  box-shadow: 0px 4px 30px gray};
  text-align:center;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  text-align:center;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    color: #212121;;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color:#A7DBD5;
    color:#212121;
  }
  
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
});

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.func,
    root: PropTypes.elementType,
  }),
};

export default function UnstyledSelect({options}) {
  return (
    <CustomSelect defaultValue={options[0].value}>
      {options.map((option)=>{
        return <StyledOption  value={option.value}>{option.name}</StyledOption>
      })}
    </CustomSelect>
  );
}