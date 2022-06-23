import { useEffect, useRef } from 'react'
import Graph from '../../Miscellaneous/Graph';


const MCQ = ({ index, question, data }) => {

    const graphOptions = ["bar", "pie"]

    const preprocess = () => {
        const re = [];
        for (let i = 0; i < question.options.length; i++) {
            const option = question.options[i];
            const count = data.filter(x => x === option).length;
            re.push(count);
        }
        return re;
    }


  return (
    <>
        <Graph
          preprocessedData={preprocess()}
          index={index}
          options={question.options}
          graphOptions={graphOptions}
          usingGraph={true}
        />
    </>
  )
}

export default MCQ