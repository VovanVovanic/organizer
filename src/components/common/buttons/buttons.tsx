import classes from './buttons.module.scss';
import { Button } from '@material-ui/core'
import React from 'react'
import { FilterType } from '../../app/App'


type BtnsPropType = {
  changeFilter: (value: FilterType) => void;
  active: FilterType;
};
const Buttons:React.FC<BtnsPropType> = ({changeFilter, active}) => {
  const onFilterChange = (value: FilterType)=>{
      changeFilter(value)
  }
  const btnList = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ].map(({ label, value }) => {
let activeBtn =  active === value ? classes.Active : ''
    return (
      <Button
        className = {activeBtn}
        key={value}
        onClick={() => onFilterChange(value as FilterType)}
        color="primary"
        variant='outlined'
      >
        {label}
      </Button>
    );
  })
  return (
    <ul>
      {btnList}
    </ul>
  )
}
export default Buttons