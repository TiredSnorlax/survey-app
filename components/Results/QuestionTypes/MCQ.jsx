import { useEffect, useRef } from 'react'
import styles from '../../../styles/Results.module.css'

import Dropdown from '../../Miscellaneous/Dropdown'
import Chart from 'chart.js/auto';


const MCQ = ({ index, question, data }) => {
    const canvasRef = useRef(null);

    const preprocess = () => {
        const re = [];
        for (let i = 0; i < question.options.length; i++) {
            const option = question.options[i];
            const count = data.filter(x => x === option).length;
            re.push(count);
        }
        return re;
    }


    const setup = (type) => {
        const newCanvas = document.createElement("canvas");
        newCanvas.setAttribute("id", "myChart" + index);
        canvasRef.current.appendChild(newCanvas);

        const ctx = document.getElementById('myChart' + index);
        const myChart = new Chart(ctx, {
            type: type,
            data: {
                labels: question.options,
                datasets: [{
                    label: '# who picked this',
                    data: preprocess(),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {

            }
        });
    }

    const resetGraph = () => {
        const ctx = document.getElementById('myChart' + index);
        if (ctx) ctx.remove();
    }

    const changeGraphType = (to, ctx) => {
        ctx.remove();
        setup(to);
    }

    const actions = [
        () => changeGraphType("bar", document.getElementById('myChart' + index)),
        () => changeGraphType("pie", document.getElementById('myChart' + index)),
    ]

    useEffect(() => {
        setup("bar");
        // test();

        return () => {
            resetGraph();
        }
    }, [])
  return (
    <>
      <div className={styles.graphSelector} >
          <Dropdown title={null} options={["bar", "pie"]} actions={actions} />
      </div>
      <div ref={canvasRef} style={{position: "relative", width: "95%"}} ></div>
    </>
  )
}

export default MCQ