import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../component/Weather.css'
import axios from 'axios';
export default class weather extends Component {

     constructor(props){
         super(props);

         this.state = {
             city :"",
             day :"",
             temp : "",
             humdity:"",
             icons:"",
             des:""
        }
        //bind
        this.CityInputHandler = this.CityInputHandler.bind(this)
        this.OnsubmitHandler = this.OnsubmitHandler.bind(this)
     }
     CityInputHandler(e){
          console.log()
          this.setState({city:e.target.value})
     }
     calculateDay(a){
       var s =  new Date(a * 1000).toISOString()
        return s;
     }

    OnsubmitHandler(e){
        e.preventDefault()
       
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&units=metric&appid=').then((res)=>{
           console.log(res.data)
           this.setState({temp:res.data.main.temp})
           this.setState({humdity:res.data.main.humidity})
           this.setState({icons:res.data.weather[0].icon})
           this.setState({des:res.data.weather[0].description})
           console.log(res.data.weather[0].icon)

           //calulate time,day.year
            console.log(this.calculateDay(res.data.dt))
            this.setState({day:this.calculateDay(res.data.dt)})

           
        }).catch((err)=>{
                console.log(err)
        })
        
    }
   
    render() {
        return (
           
            <div className="container">
                 <center><h1>Openweathermap</h1></center>
                    <form class="row g-3">
                        <div class="col-auto">
                            <label for="inputPassword2" class="visually-hidden">Password</label>
                            <input type="text" value={this.state.city} onChange={this.CityInputHandler} class="form-control" id="inputPassword2" placeholder="City"></input>
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-warning mb-3" onClick={this.OnsubmitHandler}>Show Weather</button>
                        </div>
                    </form>

                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">{this.state.city}</div>
                         <div className="card-body">
                             <h2 className="card-title">{ this.state.temp} °C</h2>
                             <h5 className="card-title">Humidity {this.state.humdity}%</h5>
                             <h5 className="card-title">{this.state.day}</h5>
                             <center><img src={'http://openweathermap.org/img/wn/'+this.state.icons.slice(0,2)+'d@2x.png'} alt=""></img></center>
                             <center><h5 className="card-title">{this.state.des}</h5></center>
                        </div>
                    </div>
                   
                </div>
        )
    }
}
