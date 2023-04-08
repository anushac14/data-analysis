import { useState } from 'react'
import React from 'react';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import Select from "react-select"	
import CreatableSelect from "react-select/creatable";
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

var col_names = []; 	
var options = []; 	
var newArray = []; 
var plot_col; 

export default function CsvReader(){
const [value, setvalue] = useState('')
  const  handleOnchange  =  val  => {
    setvalue(val)
  }
    
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const one_col = []; 
    const two_col = []; 

    // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        col_names = headers; 	
        var i; 	
        for(i = 0; i < headers.length; i++){	
            var pair = {value: headers[i], label: headers[i]};	
            options.push(pair); 	
        }
        const rows = str.slice(str.indexOf('\n')+1).split('\n');
        for (let i = 0; i < rows.length; ++i){
            var row = rows[i].split(','); 
            newArray.push(row); 
        }

        // const newArray = rows.map( row => {
        //     const values = row.split(delim);
        //     const eachObject = headers.reduce((obj, header, i) => {
        //         obj[header] = values[i];
        //         return obj;
        //     }, {})
        //     return eachObject;
        // })
        setCsvArray(newArray) 
    }

    function Scatterplot (){
        var cols = value.split(',');
        var one_col_num = -1; 
        var two_col_num = -1
        for(let i = 0; i < col_names.length; ++i){
            if(col_names[i] == cols[0]){
                one_col_num = i
            }
            if(col_names[i] == cols[1]){
                two_col_num = i
            }
        }


        console.log(one_col)
        console.log(two_col)
    }




    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            //console.log(text);
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
  	
            <div className="app">
      <div  className="preview-values">
        <h4>Values</h4>
        {value}
      </div>

      <MultiSelect
        onChange={handleOnchange}
        options={options}
      />
    </div>
    {Scatterplot()} 
                
            {csvArray.length>0 ? 
            <>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </> : null}
        </form>
    );

}
