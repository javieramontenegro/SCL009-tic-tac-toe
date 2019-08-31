import React from 'react';
import { StyleSheet,Text,  View,TouchableOpacity,Image,ImageBackground,Alert,ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

export default class App extends React.Component {
 
   constructor(props){
      super(props);
      this.state ={
        gameState:[
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
        currentPlayer:1,
         fontLoaded:false,
      }
   }
    componentDidMount(){
     this.initializeGame();
    
    }
initializeGame =()=>{
      this.setState(
     {
        gameState:[
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
        currentPlayer:1
      })
}
getWinner=()=>{
  const numTitle =3;
  
  let arr =this.state.gameState;
  let sum;
  //chequear rows
  for(i=0;i<numTitle;i++){
    sum =arr[i][0] + arr[i][1] + arr[i][2];
    if (sum ==3){return 1;}
    else if (sum ==-3){return -1}; 
  }
   //chequear columnas
   for(i=0;i<numTitle;i++){
    sum =arr[0][i] + arr[1][i] + arr[2][i];
    if (sum ==3){return 1;}
    else if (sum ==-3){return -1}; 
  }
   //chequear diagoales
    sum =arr[0][0] + arr[1][1] + arr[2][2];
    if (sum ==3){return 1;}
    else if (sum ==-3){return -1}; 

    sum =arr[2][0] + arr[1][1] + arr[0][2];
    if (sum ==3){return 1;}
    else if (sum ==-3){return -1}; 
   //cheauqear empate
   
  
      
  
    //no hay ganadores
   return 0; 
   
   
  
}
draw =(arr)=>{
   
  // check que ninguno de los espaciones esta vacio
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
          // uno de los espacios esta vacio
          if(arr[i][j] == 0){
              return false;   
          }   
      }   
  }
  return true;


}
currentPlayer=()=>{
  let currentPlayer= this.state.currentPlayer;
  switch(currentPlayer)
  {
    case 1: return <Text>Turno de Chen</Text>;
    case -1: return <Text>Turno de D.O</Text>
    default: return <View />
  }
}

renderIcon =(row,col) =>{
  let value = this.state.gameState[row][col];
  switch(value)
  {
    case 1: return <Image source={require('./assets/chen.png')} style={styles.titleX}/>;
    case -1: return <Image source={require('./assets/do.png')} style={styles.titleX}/>;
    default: return <View />
  }
}
onTitlePress =(row,col)=>{
  //no deja que cambie el espacio
  let value = this.state.gameState[row][col];
  if (value !== 0){return;}
  //encuebtra al jugador correcto
let currentPlayer= this.state.currentPlayer;
//seterar el espacio correcto
let arr = this.state.gameState.slice();
arr[row][col]=currentPlayer;
this.setState({gameState:arr})
//cambiar al otro jugador
let nextPlayer=(currentPlayer==1)?-1 : 1;
this.setState({currentPlayer:nextPlayer})
//chequeaar ganadores
let winner=this.getWinner();
if (winner ==1){
  /* alert("player 1 ganador") */
  Alert.alert(
    'Chen ganó',
   'Awaeeeeeeee, I cant believe!!',
    [
      {text: 'OK', onPress: () =>  this.initializeGame()},
    ],
    {cancelable: false},
  );
 
}
else if(winner == -1){
  Alert.alert(
    'D.O ganó',
   'SatanSoo esta orgulloso de tí ...people como and people go!!',
    [
      {text: 'OK', onPress: () =>  this.initializeGame()},
    ],
    {cancelable: false},
  );
}
/* //chequear empate
else if(winner == 0){
  alert("empate")
  this.initializeGame();
} */
else if (winner == 0){
let draw=this.draw(arr);
if( draw ){
  Alert.alert(
    'Empate',
   'Recuerda que Lay dijo:"Exo es un grupo muy masculino"',
    [
      {text: 'OK', onPress: () =>  this.initializeGame()},
    ],
    {cancelable: false},
  );
}}
/* else if (winner == 0){
  let arr = this.state.gameState.slice();
  let tie=true;
      for(let i=0;i<3;i++){
         for(let j=0; i<3;j++){
    if(arr[i][j] == 0){
       tie=false;
      } 
    }
  }
     if (tie){
       alert("empate")
     }
} */



}
 render(){
  return (
   <ImageBackground source={require('./assets/back.jpg')}  style={styles.back}>
           
       <Text style={styles.test} >
          <Image source={require('./assets/exo.png')} style={styles.exo}/>;
        </Text>
      
      
            <Text style={styles.player}>{this.currentPlayer()} </Text>
        
      
           
        
    <View style={styles.container}>
       
    
      <View style={styles.rows} >
           <TouchableOpacity onPress={()=>this.onTitlePress(0,0)} style={[styles.title,{borderLeftWidth:0,borderTopWidth:0}]} >
                {this.renderIcon(0,0)}
            </TouchableOpacity >
      
            <TouchableOpacity onPress={()=>this.onTitlePress(0,1)} style={[styles.title,{borderTopWidth:0}]} >
                   {this.renderIcon(0,1)}
             </TouchableOpacity >
       
             <TouchableOpacity onPress={()=>this.onTitlePress(0,2)} style={[styles.title,{borderRightWidth:0,borderTopWidth:0}]} >
             {this.renderIcon(0,2)}
              </TouchableOpacity >
     
     
       </View>
      <View style={styles.rows} >
          <TouchableOpacity onPress={()=>this.onTitlePress(1,0)} style={[styles.title,{borderLeftWidth:0}]} >
                 {this.renderIcon(1,0)}
          </TouchableOpacity > 
          <TouchableOpacity onPress={()=>this.onTitlePress(1,1)} style={styles.title} >
          {this.renderIcon(1,1)}
           </TouchableOpacity > 
          
          <TouchableOpacity onPress={()=>this.onTitlePress(1,2)} style={[styles.title,{borderRightWidth:0}]} >
          {this.renderIcon(1,2)}  
          </TouchableOpacity >
      </View>
      <View style={styles.rows} >
        <TouchableOpacity onPress={()=>this.onTitlePress(2,0)} style={[styles.title,{borderLeftWidth:0,borderBottomWidth:0}]}>
            {this.renderIcon(2,0)}
         </TouchableOpacity > 
        <TouchableOpacity onPress={()=>this.onTitlePress(2,1)} style={[styles.title,{borderBottomWidth:0}]}>
                {this.renderIcon(2,1)}
          </TouchableOpacity >
        <TouchableOpacity onPress={()=>this.onTitlePress(2,2)} style={[styles.title,{borderRightWidth:0,borderBottomWidth:0}]}>
              {this.renderIcon(2,2)}
          </TouchableOpacity >
      </View>
      
      
      

    </View>
    </ImageBackground>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
marginBottom:110,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  title:{
    borderWidth:2,
    width:100,
    height:100,
    color:'white',
    borderColor:'#f6ee44',
  },
  rows:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleX:{
    flex: 1,
    resizeMode:'contain',
   
  },
  titleO:{
    flex: 1,
    resizeMode:'contain',
    
  },
  back:{
    flex: 1,
    resizeMode:'contain', 
  },
  exo:{
    
    resizeMode:'cover', 
    },
  test:{
    flex:1,
    textAlign:'center',
  },
  player:{
    flex:1,
    textAlign:'center',
    fontSize:30,
    color:'white',
    marginTop:5,
    
  },
 
});
