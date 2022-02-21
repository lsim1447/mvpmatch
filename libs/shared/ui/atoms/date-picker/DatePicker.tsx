import styled from 'styled-components';

const StyledDateInput = styled.input`
  float: right;

  background: #1bc5bd;
  border-radius: 5px;
  border: 1px solid #1bc5bd;
  color: #ffffff;
  cursor: pointer;

  font-size: 14px;
  line-height: 16px;
  text-align: center;

  height: 32px;
  width: 150px;
  padding: 8px 10px;

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

type DatePickerProps = {
  value: string;
  onChange: any;
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => (
  <StyledDateInput type="date" value={value} onChange={onChange} />
);

export default DatePicker;
