import React from 'react'
import { Dropdown } from "flowbite-react"

const FilterButton = ({ type, option1, option2, option3, option4 }) => {
    // THIS IS A TEMPLATE FOR NOW - WE WILL FILL OUT CORRECTLY WHEN WE SET UP APP NAVIGATION FLOW 
  return (
    <Dropdown label={type} dismissOnClick={false}>
      <Dropdown.Item>{option1}</Dropdown.Item>
      <Dropdown.Item>{option2}</Dropdown.Item>
      <Dropdown.Item>{option3}</Dropdown.Item>
      <Dropdown.Item>{option4}</Dropdown.Item>
    </Dropdown>
  )
}
// DROPDOWN DOCS: https://flowbite-react.com/docs/components/dropdown#dropdown-header
export default FilterButton