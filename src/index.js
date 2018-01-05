import React,{Component} from 'react';
import {render} from 'react-dom';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import jsonp from 'jsonp';
/*
    1.给input绑定值改变事件，当值发生改变时调用对应的监听函数
    2.获取到input框中的值，然后调用百度接口获取数据，并修改状态对象中words属性
    3.调用百度接口时，除了传统方法，还可以用jsonp模块的jsonp函数方法
    具体：npm install jsonp,然后调用即可！
    https://www.baidu.com/su?wd=a&cb=cb
    param是回调函数callback的名字,jsonp函数url参数不是用引号包裹的？？？？

*/
export default class Suggest extends Component{
    constructor(){
        super();
        this.state={
            words:[],
            index:-1      //当前选中的索引,li第一个Index为0，Input的index为-1     
        };
    }
    handleChange=(event)=>{
        let wd = event.target.value;
        jsonp(`http://www.baidu.com/su?wd=${wd}`,{
            param:'cb'
        },(err,data)=>{
            console.log(data);
            this.setState({words:data.s})
        })
    }
    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8 col-sm-offset-2'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>
                                <input type='text' className='form-control' onChange={this.handleChange}/>
                            </div>
                            <div className='panel-body'>
                                <ul className='list-group'>
                                    {
                                        this.state.words.map((word,index)=>
                                            <li key={index} className='list-group-item'>{word}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}
render(<Suggest/>,document.getElementById('root'));