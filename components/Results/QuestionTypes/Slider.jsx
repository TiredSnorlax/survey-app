import { useState, useEffect } from 'react'
import Graph from '../../Miscellaneous/Graph'

const Slider = ({index, question, data}) => {
    const [usingGraph, setUsingGraph] = useState(true);
    const [average, setAverage] = useState(0);


    const graphOptions = ["bar", "pie", "slider"];

    const _min = parseInt(question.options[0]);
    const _max = parseInt(question.options[1]);

    const preprocess = () => {
        const re = [];
        for (let i = _min; i < _max + 1; i++) {
            const count = data.filter(x => parseInt(x) === i).length;
            re.push(count);
        }
        return re;
    }

    const getOptions = () => {
        const re = [];
        for (let i = _min; i < _max + 1; i++) {
            re.push(i);
        }
        return re;
    }

    const getAverage = () => {
        let _total = 0;
        for (let i = 0; i < data.length; i++) {
            _total += parseInt(data[i]);
        }

        return (_total / data.length).toFixed(2);
    }

    useEffect(() => {
        setAverage(getAverage())
    }, [])



  return (
    <>
        <Graph
            preprocessedData={preprocess()}
            index={index}
            options={getOptions()}
            graphOptions={graphOptions}
            usingGraph={usingGraph}
            additionalActions={[() => setUsingGraph(false)]}
        />
        { !usingGraph &&
            <div style={{
                display: "flex",
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                gap: "1rem",
                width: "100%",
                padding: "1rem 2rem",
                textAlign: "center",
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: "100%", gap: "1rem"}}>
                    <p>{_min}</p>
                    <input style={{width: "100%"}} type="range" min={_min} max={_max} value={average} readOnly={true} />
                    <p>{_max}</p>
                </div>
                <p style={{fontSize: '1rem', fontWeight: "bold"}}>Avg: {average}</p>
            </div>
        }
    </>
  )
}

export default Slider