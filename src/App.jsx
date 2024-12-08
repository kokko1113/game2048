import './App.css'
import { useField } from './hooks/useField'
import { Field } from './components/field/field'
import { Result } from './components/result/result'

function App() {
  const { field, isFinish } = useField()

  return (
    <>
      {
        !isFinish ?
          <Field field={field}></Field>
          :
          <Result></Result>
      }
    </>
  )
}

export default App
