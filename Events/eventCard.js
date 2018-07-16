import React,{Component} from 'react' ;
import { Font } from 'expo';
import firebase from 'firebase/app';
import 'firebase/database';
import {DB_Config} from '../Config/fire'
import Icon from 'react-native-vector-icons/Ionicons'
import { 
    StyleSheet, 
    Text, 
    View,
    Image ,
    Button,
    SafeAreaView } 
    from 'react-native';

export default class EventCard extends Component{

    constructor(props){
      super(props);
      this.state = {fontLoaded: false, eventId : this.props.eventId , eventDetails : {} };
			this.app = !firebase.apps.length ? firebase.initializeApp(DB_Config) : firebase.app();
			this.db = firebase.database().ref().child('city-events');
    }

    async componentDidMount() {
        await Font.loadAsync({
          'Eczar': require('../assets/fonts/Eczar/Eczar-Medium.ttf'),
					'Fredericka the Great' : require('../assets/fonts/Fredericka_the_Great/FrederickatheGreat-Regular.ttf'),
          'Raleway': require('../assets/fonts/Raleway/Raleway-Medium.ttf'),
          'Lora': require('../assets/fonts/Lora/Lora-Regular.ttf'),
          'ElMessiri': require('../assets/fonts/El_Messiri/ElMessiri-Regular.ttf'),
          'Quicksand': require('../assets/fonts/Quicksand/Quicksand-Medium.ttf')
        });

        console.ignoredYellowBox = [
          'Setting a timer'
        ]; 

				this.setState({ fontLoaded: true });
				
				// Reading Events From Firebase
				await	firebase.database().ref('city-events').on('value', (data) => {
          let events= data.toJSON();
          this.setState({eventDetails : events[this.state.eventId]});
				})
    }

    render(){
        return(
            <View style={styles.container}>
							{
                this.state.fontLoaded 
                ?<View>
									<View style={styles.card}>
										<Image style={styles.poster} source={{uri:this.state.eventDetails.poster}} />
										<Text style={styles.title}>{this.state.eventDetails.title} </Text>
										<Icon name="md-pin" style={styles.icon} size={16} ><Text style={styles.venue}> {this.state.eventDetails.venue}</Text></Icon>
										<Icon name="md-calendar" style={styles.icon} size={16} ><Text style={styles.time}> {this.state.eventDetails.time}</Text></Icon>
                    <View style= {styles.cardFooter}>  
                      <Icon name="md-cash" style={styles.icon} size={16} >
                        <Text style={styles.price}> {this.state.eventDetails.price} </Text>
                      </Icon>
                      <View style={styles.type}><Text style={styles.time} > {this.state.eventDetails.type} </Text></View>
                    </View>
								 	</View>
								 </View>
                : null
              }
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    card: {
			backgroundColor: '#3e3947',
			padding: 5,
			borderRadius: 3,
			height: 225,
			marginBottom : 5,
			width: '100%'
		},
		poster:{ 
			width: '100%' ,
		  height: '50%'  
		},
    title: {
      fontFamily: 'Raleway',
      color: '#fff',
      fontSize: 25
    },
    venue: {
      fontFamily: 'Quicksand',
      color: '#fff',
      fontSize: 15
		},
		time: {
      fontFamily: 'Quicksand',
      color: '#fff',
      fontSize: 15
    },
    price: {
      fontFamily: 'Quicksand',
      color: '#fff',
      fontSize: 12
		},
		icon: {
			color: '#52e2ab'
    },
    cardFooter :{
      flex: 1,
      flexDirection: 'row'

    },
    type: {
      height : 30,
      width:80,
      borderRadius : 3,
      marginLeft : 175,
      backgroundColor: '#696372',
      justifyContent : 'center',
      alignItems : 'center'
    }
		
});