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

export default class PlaceCard extends Component{

    constructor(props){
      super(props);
      this.state = {fontLoaded: false, placeId : this.props.placeId , placeDetails : {} };
	  this.app = !firebase.apps.length ? firebase.initializeApp(DB_Config) : firebase.app();
	  this.db = firebase.database().ref().child('places-visit');
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
		await	firebase.database().ref('places-visit').on('value', (data) => {
            let places= data.toJSON();
            this.setState({placeDetails : places[this.state.placeId]});
        })
        
    }

    render(){
        return(
            <View style={styles.container}>							
            {
                this.state.fontLoaded 
                ?<View>
					<View style={styles.card}>
						<Image style={styles.img} source={{uri:this.state.placeDetails.img}} />
						<Text style={styles.title}>{this.state.placeDetails.title} </Text>
						<Text style={styles.description}> {this.state.placeDetails.description}</Text>
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
      width: 360,
      height: 700
	},
    img:{ 
      marginTop: 20,
	  width: '100%' ,
	  height: '40%'  
	},
    title: {
      fontFamily: 'Raleway',
      color: '#fff',
      fontSize: 25
    },
    description: {
      fontFamily: 'Quicksand',
      color: '#fff',
      fontSize: 15
	}
		
});