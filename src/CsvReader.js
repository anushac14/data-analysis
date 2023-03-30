import { useState } from 'react'
import React from 'react';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const one_col = []; 
    const two_col = []; 

    // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        setCsvArray(newArray) 

        for(let i = 0; i < headers.length; ++i){
            console.log(headers[i])
        }
        for(let i = 0; i < newArray.length; ++i){
            one_col.push(newArray[i].Temperature); 
            two_col.push(newArray[i].DewPoint); 
        }
    }

    function Scatterplot (one_col, two_col){
        const data = []; 
        for(let i =0; i < one_col.length; ++i){
            var obj = {x: one_col[i], y: two_col[i]};
            data.push(obj); 
        }

        return (
            <ScatterChart width={400} height={400}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" />
                <YAxis type="number" dataKey="y" />
                <Scatter data={data} fill="green" />
            </ScatterChart>
        );
    }




    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text); 
        }

        reader.readAsText(file);
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}
            >
                Submit
            </button>
            <br/>
            <br/>
            {csvArray.length>0 ? 
            <>
                <table>
                    <thead>
                        <th>Group Start</th>
                        <th>Group End</th>
                        <th>Time Start</th>
                    </thead>
                    <tbody>
                        {
                            csvArray.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.Group}</td>
                                    <td>{item.End}</td>
                                    <td>{item.TimeStart}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </> : null}
        </form>
    );

}
