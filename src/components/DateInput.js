import React from 'react'

import theme from '@root/theme'

import { HStack, Icon, Select } from 'native-base'
import { MaterialCommunityIcons } from '@native-base/icons'

export default function DateInput({ date, setDate, month, setMonth, year, setYear, setFinalDate, mt, mx }) {
  const dates = [...Array(31).keys()].map(val => val+1)
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const years = [...Array(200).keys()].map(val => val+1950)

  return (
    <>
      <HStack mt={mt} mx={mx} space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='calendar'></Icon>
        <HStack space='2' alignItems='center'>
          <Select minWidth='25%' selectedValue={date} placeholder='Date' onValueChange={val => {
              setDate(val)
              setFinalDate(prev => {
                prev.setDate(parseInt(val))
                return prev
              })
            }}>
            {
              dates.map((date, idx) => <Select.Item key={idx} label={date.toString()} value={date.toString()} />)
            }
          </Select>
          <Select minWidth='35%' selectedValue={month} placeholder='Month' onValueChange={val => {
              setMonth(val)
              setFinalDate(prev => {
                prev.setMonth(months.findIndex(month => (month == val)))
                return prev
              })
            }}>
            {
              months.map((month, idx) => <Select.Item key={idx} label={month} value={month} />)
            }
          </Select>
          <Select minWidth='29%' selectedValue={year} placeholder='Year' onValueChange={val => {
              setYear(val)
              setFinalDate(prev => {
                prev.setFullYear(parseInt(val))
                return prev
              })
            }}>
            {
              years.map((year, idx) => <Select.Item key={idx} label={year.toString()} value={year.toString()} />)
            }
          </Select>
        </HStack>
      </HStack>
    </>
  )
}
