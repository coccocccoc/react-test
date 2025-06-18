import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cashbookSlice } from './App'



const Cashbook = () => {

  const [money, setMoney] = useState(0)
  const [id, setId] = useState(1)
  const [type, setType] = useState('수입')
  const dispatch = useDispatch()
  const list = useSelector((state) => {
    return state.cashbook.list
  })
  let total = 0;

  for (let i = 0; i < list.length; i++){
    const item = list[i]
    const money = Number(item.money)
    if (item.type === '수입') {
      total = total + money
    } else {
      total = total - money
    }
  }


  return (
    <>
      <div>
        <label for="income">수입</label>
        <input type="radio" id="income" name="radio" value="income" onClick={() => setType('수입')}/>
        <label for="expense">지출</label>
        <input type="radio" id="expense" name="radio" value="expense" onClick={() => setType('지출')}/>
      </div>
      <div>
        <span>금액</span>
        <input type="number" value={money} onChange={(event)=>{setMoney(event.target.value)}}></input>
        <button onClick={() => {
          dispatch(cashbookSlice.actions.add({ id: id, money: money, type:type }))
          setMoney('')
          setId(id + 1)
          
        }}>등록</button>
      </div>
      <h3>총금액: {total}</h3>
      <ul>
        {list.map((cashbook) => {
          return (<li key={cashbook.id}>({cashbook.type}){cashbook.money}<button onClick={() => {
              dispatch(cashbookSlice.actions.delete({ id: cashbook.id }))
            }}>삭제</button>
          </li>)
        })}
      </ul>
    </>
  )
}

export default Cashbook